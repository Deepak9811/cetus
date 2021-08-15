const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const constS = require("../service/Contanst");
var connection = mongoose.createConnection(
  constS.MONGOURL
);
autoIncrement.initialize(connection);

const SocialMedia = mongoose.Schema({
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

SocialMedia.plugin(autoIncrement.plugin, "SocialMedia");

module.exports = mongoose.model("SocialMedia", SocialMedia);
