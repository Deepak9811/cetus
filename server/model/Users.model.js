const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const constS = require("../service/Contanst");
var connection = mongoose.createConnection(
  constS.MONGOURL
);

autoIncrement.initialize(connection);

const User = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },

  token: {
    type: String,
    required: false,
  },

  email: {
    type: String,
    required: false,
  },

  phone: {
    type: String,
    required: false,
  },

  password: {
    type: String,
    required: false,
  },
});

User.plugin(autoIncrement.plugin, "User");

module.exports = mongoose.model("Users", User);
