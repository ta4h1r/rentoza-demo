var mongoose = require("mongoose");

const collectionName = "patrons";

// Setup schema
var inputSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  drinks: {
    type: Array,
    required: false,
  },
  bodyMass: {
    type: Number, 
    required: true
  }
});

// Export Input model
var Input = (module.exports = mongoose.model(collectionName, inputSchema));

module.exports.get = function (callback, limit) {
  Input.find(callback).limit(limit);
};
