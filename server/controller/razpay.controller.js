const razpaySchema = require("../routes/razpay");
const ResponseObj = require("../service/Response.service");
const Razorpay  = require("razorpay");


exports.getRazorPayOrderId = (req, res) => {


// [TEST MODE]
/**
  var key_id = "rzp_test_gi866dQEQC5ElU";
  var key_pass = "z1x9jUZ9QEeYqt7tBoogAlk0";
/*/
  
// [LIVE MODE]
  var key_id = "rzp_live_nmaRTNIKkopgh8";
  var key_pass = "897ECo8QsuIbemVkiWjnVAeE";

/**/

    var instance = new Razorpay({
        key_id: key_id,  
        key_secret: key_pass,
      });
      req.query.amount = parseInt(req.query.amount);
      instance.orders.create(req.query, (err, order) => {
        if (err) {
          let errorKeyArray = Object.keys(err.errors);
          let msgArray = errorKeyArray.map((obj) => {
            return err.errors[obj];
          });
          ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(",")});
        } else ResponseObj.successResponse(res, order);
      });
};
