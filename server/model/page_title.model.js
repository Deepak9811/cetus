const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const constS = require("../service/Contanst");
var connection = mongoose.createConnection(
  constS.MONGOURL
);
autoIncrement.initialize(connection);


const Page_title = mongoose.Schema({

  page_title: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: false,
  },
  
});

Page_title.plugin(autoIncrement.plugin, "Page_title");

module.exports = mongoose.model("Page_title", Page_title);
