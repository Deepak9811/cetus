const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const constS = require("../service/Contanst");
var connection = mongoose.createConnection(
  constS.MONGOURL
);
autoIncrement.initialize(connection);

const MostPopular = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  image: {
    type: Array,
    required: true,
  },

  celebrity_id: {
    type: String,
    required: true,
  },
});

MostPopular.plugin(autoIncrement.plugin, "MostPopular");

module.exports = mongoose.model("MostPopular", MostPopular);
