// Dependencies
Table = require("./inputModel"); // This is the mongodb collection, which you can call mongodb shell functions on. See Mongoose.js documentation for more.

exports.index = async (req, res) => {
  data = await Table.find({});
  res.status(200).json(data);
};

exports.retrieve = async (req, res) => {
  data = await Table.findOne({ _id: req.params.id });
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

exports.retrieveSaturation = async (req, res) => {
  try {
    const id = req.params.id;
    const patron = await Table.findOne({
      _id: id,
    });
    const saturation = patron.drinks.reduce((acc, curr) => {
      const elapsedTime =
        (Date.now() - new Date(curr.timeTaken).getTime()) / 1000;
      const lambda = (patron.bodyMass/(curr.drink.mlsAlcohol*1000));
      const sat = acc + Math.pow(Math.E, -(lambda * elapsedTime));
      return sat;
    }, 0);
    res.json(saturation);
  } catch (e) {
    res.status(400).json(e);
  }
};
