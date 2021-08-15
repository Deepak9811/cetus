const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const constS = require("../service/Contanst");
var connection = mongoose.createConnection(constS.MONGOURL);
autoIncrement.initialize(connection);

const Banner = mongoose.Schema({
  image: {
    type: Array,
    required: false,
  },

  title : {
    type : String,
    required : false
  }
});

Banner.plugin(autoIncrement.plugin, "Banner");

module.exports = mongoose.model("Banner", Banner);
