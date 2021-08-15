const CoupenSchema = require("../model/Coupens.model.js");
const ResponseObj = require("../service/Response.service");

//**********************ADD-Coupen******************************** */

exports.AddCoupen = (req, res) => {
  let registerObj = new CoupenSchema(req.body);
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

// **********************CHECK-Coupen-ALREADY-EXIST****************************************

exports.CheckCoupenRegister = (req, res) => {
  CoupenSchema.findOne(
    {
      $or: [{ user_id: req.body.user_id }],
      $and: [{ _id: req.body._id }],
    },
    (err, mongoresponse) => {
      if (err) {
        console.log("Error", err);
        res.status(200).send({ response: "error", type: "crash" });
      } else {
        if (mongoresponse) {
          res.status(200).send({ response: "ok", data: mongoresponse });
        } else {
          res.status(200).send({ response: "error", type: "not_exist" });
        }
      }
    }
  );
};

//**********************GET-Coupen******************************** */

exports.getCoupenList = (req, res) => {
  CoupenSchema.find((err, data) => {
    if (err) {
      let errorKeyArray = Object.keys(err.errors);
      let msgArray = errorKeyArray.map((obj) => {
        return err.errors[obj];
      });
      ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(", ") });
    } else ResponseObj.successResponse(res, data);
  });
};

// ***********************GET-DATA-COUPON-NAME***********************/

exports.getCoupenById = (req, res) => {
  CoupenSchema.find({ coupen_name: req.query.coupen_name }, (err, data) => {
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

// ***************************GET-DATA-COUPON-CODE*******************/

exports.getCoupenCode = (req, res) => {
  CoupenSchema.find({ coupon_code: req.query.coupon_code }, (err, data) => {
    if (err) {
      console.log(err);
      let errorKeyArray = Object.keys(err.errors);
      let msgArray = errorKeyArray.map((obj) => {
        return err.errors[obj];
      });
      ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(", ") });
    } else if (data.length !== 0) {
      ResponseObj.successResponse(res,data);
    } else {
      res.status(400).send({ response: "error" });
    }
      
  });
};

// **********************CHECK-coupon-ALREADY-EXIST****************************************

exports.CheckcouponRegister = (req, res) => {
  CoupenSchema.findOne({ coupon_code: req.body.coupon_code },
    // {
    //   $or: [{ user_id: req.body.user_id }],
    //   $and: [{ coupon_code: req.body.coupon_code }],
    // },
    (err, mongoresponse) => {
      if (err) {
        console.log("Error", err);
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


//**********************DELETE-CELEBRITY***************************************** */
exports.DeleteCoupen = (req, res) => {
  CoupenSchema.deleteOne({ _id: req.query._id }, { new: true }, (err, data) => {
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

//********************************UPDATE-Coupen-DATA***************************** */

exports.UpdateCoupen = (req, res) => {
  CoupenSchema.findOneAndUpdate(
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

// //**********************LOG-IN-Coupen******************************** */

// exports.login = (req, res) => {
//   TokenService.encrptyToken(req.body, (ecryptData) => {
//     console.log(ecryptData);
//     CoupenSchema.findOneAndUpdate(
//       {
//         $or: [{ "email": req.body.email }, { phone: req.body.email }],
//         $and: [{ "password": req.body.pass }],
//       },
//       { token: ecryptData },
//       (err, data) => {
//         if (err) {
//           res.status(400).send({ response: "error" });
//         } else {
//           if (data) {
//             ResponseObj.successResponse(res,data
//             );
//           } else {
//             res.status(400).send({ response: "error" });
//           }
//         }
//       }
//     );
//   });
// };

// //**************************GET-Coupen-INFO-BY-EMAIL*********************** */

// exports.findCoupenInfByEmail = (req, res) => {
//   CoupenSchema.find({ email: req.query.email }, (err, data) => {
//     if (err) {
//       console.log(err);
//       let errorKeyArray = Object.keys(err.errors);
//       s;
//       let msgArray = errorKeyArray.map((obj) => {
//         return err.errors[obj];
//       });
//       ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(", ") });
//     } else ResponseObj.successResponse(res, data);
//   });
// };
