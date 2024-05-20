var mongoose = require("mongoose");

const collectionName = "patrons";

// Setup schema
var inputSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  drinks: {
    type: [{
      drink: {
        name: String, 
        id: Number, 
        mlsAlcohol: Number
      }, 
      timeTaken: Date
    }],
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
