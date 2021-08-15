const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const constS = require("../service/Contanst");
var connection = mongoose.createConnection(
  constS.MONGOURL
);
autoIncrement.initialize(connection);


const Category = mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  image: {
    type: Array,
    required: true,
  },

  Category_status: {
    type: String,
    required: false,
  },
  
});

Category.plugin(autoIncrement.plugin, "Category");

module.exports = mongoose.model("Category", Category);
