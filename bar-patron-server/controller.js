// Dependencies
Table = require("./inputModel"); // This is the mongodb collection, which you can call mongodb shell functions on. See Mongoose.js documentation for more.

exports.index1 = (req, res) => {
  console.log("Getting all table data");
  Table.get((err, documents) => {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      // This is the response object sent by the API
      data: documents,
    });
    console.log("Done");
  });
};

exports.post1 = async function (req, res) {
  try {
    const event = req.body;
    // console.log(event);

    switch (event.command) {
      case "List":
        var obj = {};
        var names = [];
        var roles = [];
        var ids = [];
        await listItems(obj, names, ids, roles, res);
        break;

      case "Update":
        /**
         * Updates the selected entity in the face-index-table and in the S3 bucket
         */
        // Applying changes to DB
        if (event.Role == "") {
          event.Role = "N/A";
        }

        console.log("Updating DB...");
        await Table.updateOne(
          { id: event.id },
          { Role: event.Role, Name: event.Name },
        );

        // Applying changes to S3 bucket
        console.log("Updating S3 bucket...");
        moveFolder(event, res);
        console.log("Done");

        break;

      case "Delete":
        console.log("Deleting DB entry...");
        await Table.deleteOne({ id: event.id });

        // Deleting the s3 object
        console.log("Deleting S3 object...");
        await deleteFolder(event, res);
        console.log("Done");

        break;
    }
  } catch (err) {
    console.log(err);
  }
};

exports.index2 = (req, res) => {
  console.log("INDEX ROUTE 2");
  res.json({
    // This is the response object sent back by the API
    message: "HELLO ROUTE 2",
    data: {
      field1: "dumb string",
      field2: 12345,
    },
  });
};

exports.post2 = (req, res) => {
  console.log("POST ROUTE 2", req.body); // the data you POST to this endpoint is inside req
  res.json({
    message: "HELLO ROUTE 2",
    data: {
      field1: "dumb string",
      field2: 12345,
    },
  });
};

exports.delete2 = (req, res) => {
  console.log("DELETE ROUTE 2");
  res.json({
    message: "HELLO ROUTE 2",
    data: {
      field1: "dumb string",
      field2: 12345,
    },
  });
};

async function listItems(obj, names, ids, roles, callback) {
  await Table.find(null, (err, doc) => {
    doc.forEach((item) => {
      names.push(item.Name);
      ids.push(item.id);
      roles.push(item.Role);
    });
  });

  obj.Name = names;
  obj.id = ids;
  obj.Role = roles;
  callback.json(obj);
}

function moveFolder(event, callback) {
  var IDs = [];
  var names = [];
  var params = {
    Bucket: bucket,
  };

  s3.listObjectsV2(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      data.Contents.forEach((item) => {
        IDs.push(item.Key.split("/")[1]);
        names.push(item.Key.split("/")[0]);
      });
    }
  })
    .promise()
    .then((res) => {
      var i;
      for (i = 0; i < IDs.length; i++) {
        if (IDs[i] == event.id && names[i] != event.Name) {
          // Copying contents to destination folder
          const destinationFolder = event.Name + "/" + event.id;
          const folderToMove = names[i] + "/" + event.id;
          console.log("Folder: " + folderToMove);
          console.log("Destination: " + destinationFolder);
          s3CopyFolder(bucket, folderToMove + "/", destinationFolder + "/");
          break;
        }
      }
    })
    .then((res) => {
      var i;
      for (i = 0; i < IDs.length; i++) {
        if (IDs[i] == event.id && names[i] != event.Name) {
          // Deleting source folder
          const folderToDelete = names[i] + "/" + event.id;
          emptyBucket(bucket, folderToDelete, callback);
          break;
        }
      }
    })
    .then((res) => {
      var i;
      for (i = 0; i < IDs.length; i++) {
        if (IDs[i] == event.id && names[i] != event.Name) {
          // Deletes the name directory if it is empty
          const directoryToDelete = names[i] + "/";
          const params = {
            Bucket: bucket,
            Key: directoryToDelete,
          };
          s3.deleteObject(params, function (err, data) {
            if (err)
              console.log(err, err.stack); // an error occurred
            else {
              //callback.json({message: "OK"});           // successful response
            }
          });
          break;
        }
      }
    });
}

function deleteFolder(event, callback) {
  //console.log("Delete function called");
  var IDs = [];
  var names = [];
  var params = {
    Bucket: bucket,
  };

  s3.listObjectsV2(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      data.Contents.forEach((item) => {
        IDs.push(item.Key.split("/")[1]);
        names.push(item.Key.split("/")[0]);
      });
    }
  })
    .promise()
    .then((res) => {
      var i;
      for (i = 0; i < IDs.length; i++) {
        if (IDs[i] == event.id && names[i] == event.Name) {
          // Deleting source folder objects
          const folderToDelete = names[i] + "/" + event.id;
          emptyBucket(bucket, folderToDelete, callback);

          break;
        }
      }
    })
    .then((res) => {
      var i;
      for (i = 0; i < IDs.length; i++) {
        if (IDs[i] == event.id && names[i] != event.Name) {
          // Deletes the name directory if it is empty
          const directoryToDelete = names[i] + "/";
          const params = {
            Bucket: bucket,
            Key: directoryToDelete,
          };
          s3.deleteObject(params, function (err, data) {
            if (err)
              console.log(err, err.stack); // an error occurred
            else callback.json({ message: "OK", data: data }); // successful response
          });
          break;
        }
      }
    });
}

async function s3CopyFolder(bucket, source, dest) {
  // sanity check: source and dest must end with '/'
  if (!source.endsWith("/") || !dest.endsWith("/")) {
    return Promise.reject(new Error("source or dest must ends with fwd slash"));
  }

  // plan, list through the source, if got continuation token, recursive
  const listResponse = await s3
    .listObjectsV2({
      Bucket: bucket,
      Prefix: source,
      Delimiter: "/",
    })
    .promise();

  // copy objects
  await Promise.all(
    listResponse.Contents.map(async (file) => {
      await s3
        .copyObject({
          Bucket: bucket,
          CopySource: `${bucket}/${file.Key}`,
          Key: `${dest}${file.Key.replace(listResponse.Prefix, "")}`,
        })
        .promise();
    }),
  );

  // recursive copy sub-folders
  await Promise.all(
    listResponse.CommonPrefixes.map(async (folder) => {
      await s3CopyFolder(
        bucket,
        `${folder.Prefix}`,
        `${dest}${folder.Prefix.replace(listResponse.Prefix, "")}`,
      );
    }),
  );

  return Promise.resolve("ok");
}

function emptyBucket(bucketName, source, callback) {
  var params = {
    Bucket: bucketName,
    Prefix: source + "/",
  };

  s3.listObjects(params, function (err, data) {
    if (err) return callback.json({ error: err });

    if (data.Contents.length == 0) callback();

    params = { Bucket: bucketName };
    params.Delete = { Objects: [] };

    data.Contents.forEach(function (content) {
      params.Delete.Objects.push({ Key: content.Key });
    });

    s3.deleteObjects(params, function (err, data) {
      console.log(data);
      if (err) return callback.json({ error: err });
      //if(data.Contents.length == 1000)emptyBucket(bucketName,callback);
      else callback.json({ message: "OK" });
    });
  });
}
