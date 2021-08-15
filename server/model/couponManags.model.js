const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const constS = require("../service/Contanst");
var connection = mongoose.createConnection(
  constS.MONGOURL
);

autoIncrement.initialize(connection);

const couponManag = mongoose.Schema({

  user_id: {
    type: String,
    required: false,
  },

  coupon_code: {
    type: String,
    required: false,
  },


  time_used: {
    type: String,
    required: false,
  },





});

couponManag.plugin(autoIncrement.plugin, "couponManag");

module.exports = mongoose.model("couponManags", couponManag);
