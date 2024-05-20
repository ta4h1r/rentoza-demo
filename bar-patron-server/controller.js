// Dependencies
Table = require("./inputModel"); // This is the mongodb collection, which you can call mongodb shell functions on. See Mongoose.js documentation for more.

exports.index = async (req, res) => {
  data = await Table.find({});
  res.status(200).json(data);
};

exports.retrieve = async (req, res) => {
  data = await Table.findOne({_id: req.params.id});
  res.status(200).json(data);
};

exports.post = (req, res) => {
  try {
    Table.create(req.body);
    res.status(201).json();
  } catch (e) {
    res.json(e);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Table.findByIdAndDelete(id);
    res.status(203).json(id);
  } catch (e) {
    res.json(e);
  }
};

exports.put = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const u = await Table.findOneAndUpdate(
      {
          _id: id,
      },
      update
    );
    res.status(204).json(u);
  } catch (e) {
    res.json(e);
  }
};
