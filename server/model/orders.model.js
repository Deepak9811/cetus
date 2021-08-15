const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const constS = require("../service/Contanst");
var connection = mongoose.createConnection(
  constS.MONGOURL
);

autoIncrement.initialize(connection);

const Orders = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  customer_email: {
    type: String,
    required: false,
  },

  customer_phone: {
    type: String,
    required: false,
  },

  customer_name:{
    type:String,
    required:false,
  },

  instagram_user: {
    type: String,
    required: false,
  },

  celebrityId: {
    type: String,
    required: true,
  },

  celebrity_name: {
    type: String,
    required: true,
  },

  total_payment: {
    type: String,
    required: true,
  },

  subtotal: {
    type: String,
    required: false,
  },

  coupon_code: {
    type: String,
    required: false,
  },

  coupon_amount: {
    type: String,
    required: false,
  },

  status: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  someone_else: {
    type: String,
    required: false,
  },

  message_text: {
    type: String,
    required: true,
  },

  need_date: {
    type: String,
    required: true,
  },

  private_request: {
    type: String,
    required: true,
  },

  request_to: {
    type: String,
    required: false,
  },

  request_from: {
    type: String,
    required: false,
  },

  myself: {
    type: String,
    required: false,
  },

  order_type: {
    type: String,
    required: false,
  },
});

Orders.plugin(autoIncrement.plugin, "Orders");

module.exports = mongoose.model("Order", Orders);
