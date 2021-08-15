const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const constS = require("../service/Contanst");
var connection = mongoose.createConnection(
  constS.MONGOURL
);

autoIncrement.initialize(connection);

const Coupen = mongoose.Schema({

  coupon_name: {
    type: String,
    required: false,
  },


  coupon_code: {
    type: String,
    required: false,
  },


  coupon_type: {
    type: String,
    required: false,
  },


  coupon_amount : {
    type: String,
    required: false,
  },

  

  used_time: {
    type: String,
    required: false,
  },



});

Coupen.plugin(autoIncrement.plugin, "Coupen");

module.exports = mongoose.model("Coupens", Coupen);
