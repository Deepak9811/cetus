const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const constS = require("../service/Contanst");
var connection = mongoose.createConnection(
  constS.MONGOURL
);

autoIncrement.initialize(connection);

const TvSerial = mongoose.Schema({
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

TvSerial.plugin(autoIncrement.plugin, "TvSerial");

module.exports = mongoose.model("TvSerial", TvSerial);
