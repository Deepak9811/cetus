const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const constS = require("../service/Contanst");
var connection = mongoose.createConnection(
  constS.MONGOURL
);
autoIncrement.initialize(connection);

const Featured = mongoose.Schema({
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

Featured.plugin(autoIncrement.plugin, "Featured");

module.exports = mongoose.model("Featured", Featured);
