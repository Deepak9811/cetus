const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const constS = require("../service/Contanst");
var connection = mongoose.createConnection(
  constS.MONGOURL
);

autoIncrement.initialize(connection);

const GoogleLog = mongoose.Schema({
  

//   user_id: {
//     type: String,
//     required: true,
//   },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  
});

GoogleLog.plugin(autoIncrement.plugin, "GoogleLog");

module.exports = mongoose.model("GoogleLogs", GoogleLog);
