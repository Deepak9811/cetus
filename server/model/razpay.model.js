const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const constS = require("../service/Contanst");
var connection = mongoose.createConnection(
  constS.MONGOURL
);

autoIncrement.initialize(connection);

const Razorpay = mongoose.Schema({
  payment_id: {
    type: String,
    required: true,
  },

  razorpay_Id: {
    type: String,
    required: true,
  },

  amount:{
    type: String,
    required: true,
  },


  email:{
    type: String,
    required: true,
  },

  contact:{
    type: String,
    required: true,
  },


  date_time: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },
});

Razorpay.plugin(autoIncrement.plugin, "Razorpay");

module.exports = mongoose.model("Order", Razorpay);
