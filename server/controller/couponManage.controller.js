const couponManagSchema = require("../model/couponManags.model.js");
const ResponseObj = require("../service/Response.service");

//**********************ADD-couponManag******************************** */

exports.AddcouponManag = (req, res) => {
  let registerObj = new couponManagSchema(req.body);
  registerObj.save((err, mongoresponse) => {
    if (err) {
      let errorKeyArray = Object.keys(err.errors);
      let msgArray = errorKeyArray.map((obj) => {
        return err.errors[obj];
      });
      console.log(err);
      ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(", ") });
    } else {
      // TokenService.encrptyToken((data) => {
      ResponseObj.successResponse(res, mongoresponse);
      // });
    }
  });
};

// **********************CHECK-couponManag-ALREADY-EXIST****************************************

exports.CheckcouponManagRegister = (req, res) => {
  couponManagSchema.findOne(
    {
      $or: [{ user_id: req.body.user_id }],
      $and: [{ coupon_code: req.body.coupon_code }],
    },
    (err, mongoresponse) => {
      if (err) {
        // console.log("Error", err);
        res.status(200).send({ response: "error", type: "crash" });
      } else {
        if (mongoresponse) {
          res.status(200).send({ response: "ok", data: mongoresponse });
        } else {
          res.status(200).send({ response: "error", data: "not_exist" });
        }
      }
    }
  );
};

//**********************GET-couponManag******************************** */

exports.getcouponManagList = (req, res) => {
  couponManagSchema.find((err, data) => {
    if (err) {
      let errorKeyArray = Object.keys(err.errors);
      let msgArray = errorKeyArray.map((obj) => {
        return err.errors[obj];
      });
      ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(", ") });
    } else ResponseObj.successResponse(res, data);
  });
};

// ***********************GET-DATA-COUPON-BY-ID***********************/

exports.getcouponManagById = (req, res) => {
  couponManagSchema.find({ _id: req.query._id }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send({ response: "error" });
    } else if (data.length !== 0) {
      ResponseObj.successResponse(res, data);
    } else {
      res.status(400).send({ response: "error" });
    }
  });
};



//**********************DELETE-CELEBRITY***************************************** */
exports.DeletecouponManag = (req, res) => {
  couponManagSchema.deleteOne({ _id: req.query._id }, { new: true }, (err, data) => {
    if (err) {
      console.log(err);
      let errorKeyArray = Object.keys(err.errors);
      let msgArray = errorKeyArray.map((obj) => {
        return err.errors[obj];
      });
      ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(", ") });
    } else ResponseObj.successResponse(res, data);
  });
};

//********************************UPDATE-couponManag-DATA***************************** */

exports.UpdatecouponManag = (req, res) => {
  couponManagSchema.findOneAndUpdate(
    { _id: req.query._id },
    { $set: req.body },
    { new: true },
    (err, data) => {
      if (err) {
        console.log(err);
        let errorKeyArray = Object.keys(err.errors);
        let msgArray = errorKeyArray.map((obj) => {
          return err.errors[obj];
        });
        ResponseObj.errorResponse(res, {
          status: 400,
          msg: msgArray.join(", "),
        });
      } else ResponseObj.successResponse(res, data);
    }
  );
};
