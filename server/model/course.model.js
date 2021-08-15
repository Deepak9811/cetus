const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const constS = require("../service/Contanst");
var connection = mongoose.createConnection(constS.MONGOURL);
autoIncrement.initialize(connection);

// var multer  = require('multer')

const Celebrities = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },

  image_name: {
    type: String,
    required: false,
  },

  image: {
    type: Array,
    required: false,
  },

  image_2: {
    type: Array,
    required: false,
  },

  image_3: {
    type: Array,
    required: false,
  },

  yt_url: {
    type: String,
    required: false,
  },

  custom_option_name: {
    type: String,
    required: false,
  },

  custom_option_price: {
    type: String,
    required: false,
  },

  category: {
    type: String,
    required: false,
  },

  category_id: {
    type: String,
    required: false,
  },

  Feature_1: {
    type: String,
    required: false,
  },

  Feature_2: {
    type: String,
    required: false,
  },

  Feature_3: {
    type: String,
    required: false,
  },

  phone: {
    type: String,
    required: false,
  },

  email: {
    type: String,
    required: false,
  },

  gender: {
    type: String,
    required: false,
  },

  where_do_we_find_you: {
    type: String,
    required: false,
  },

  followers: {
    type: String,
    required: false,
  },

  your_description: {
    type: String,
    required: false,
  },
});

Celebrities.plugin(autoIncrement.plugin, "Celebrities");

module.exports = mongoose.model("Celebrities", Celebrities);
