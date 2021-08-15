const { update } = require("../model/Users.model");
const UserSchema = require("../model/Users.model");
const ResponseObj = require("../service/Response.service");
const TokenService = require("../service/Token.service");

//**********************ADD-USER******************************** */

exports.userRegister = (req, res) => {
  let registerObj = new UserSchema(req.body);
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

// **********************CHECK-USER-ALREADY-EXIST****************************************

exports.CheckUserRegister = (req, res) => {
  UserSchema.findOne({ email: req.body.email }, (err, mongoresponse) => {
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
  });
};

//**********************GET-USER******************************** */

exports.getUsersList = (req, res) => {
  UserSchema.find((err, data) => {
    if (err) {
      let errorKeyArray = Object.keys(err.errors);
      let msgArray = errorKeyArray.map((obj) => {
        return err.errors[obj];
      });
      ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(", ") });
    } else ResponseObj.successResponse(res, data);
  });
};

//**********************LOG-IN-USER******************************** */

exports.login = (req, res) => {
  TokenService.encrptyToken(req.body, (ecryptData) => {
    console.log(ecryptData);
    UserSchema.findOneAndUpdate(
      {
        $or: [{ email: req.body.email }, { phone: req.body.email }],
        $and: [{ password: req.body.pass }],
      },
      { token: ecryptData },
      (err, data) => {
        if (err) {
          res.status(400).send({ response: "error" });
        } else {
          if (data) {
            ResponseObj.successResponse(res,data
            //    ({
            //   'email':data[0].email,
            //   'phone':data[0].phone,
            //   'name':data[0].name,
            //   "username":data[0].userName,
            //   "_id":data[0]._id,
            //   "token":data[0].token,
            // })
            );
          } else {
            res.status(400).send({ response: "error" });
          }
        }
      }
    );
  });
};

// exports.login = (req, res) => {
//   TokenService.encrptyToken(req.body, (ecryptData) => {
//     console.log(ecryptData);
//     UserSchema.findOneAndUpdate(
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
//             //    {
//             //   email: data.email,
//             //   phone: data.phone,
//             //   name: data.name,
//             //   username: data.userName,
//             //   _id: data._id,
//             //   token: data.token,
//             // }
//             );
//           } else {
//             res.status(400).send({ response: "error" });
//           }
//         }
//       }
//     );
//   });
// };

//**************************GET-USER-INFO-BY-EMAIL*********************** */

exports.findUserInfByEmail = (req, res) => {
  UserSchema.find({ email: req.query.email }, (err, data) => {
    if (err) {
      // console.log(err);
      let errorKeyArray = Object.keys(err.errors);
      s;
      let msgArray = errorKeyArray.map((obj) => {
        return err.errors[obj];
      });
      ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(", ") });
    } else ResponseObj.successResponse(res, data);
  });
};

//*******************************FORGOT-PASSWORD-BY-EMAIL***************************** */

exports.findUserInfByEmail = (req, res) => {
  UserSchema.findOneAndUpdate(
    { email: req.query.email },
    { $set: { password: req.body.password } },
    { new: true },
    (err, data) => {
      if (err) {
        // console.log(err);
        let errorKeyArray = Object.keys(err.errors);
        s;
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

//*******************FORGOT-USER-PASSWORD-WITH-HELP-OF-TEMP-TOKEN**************************** */

exports.forgotUserPassTemp = (req, res) => {
  UserSchema.findOneAndUpdate(
    { email: req.query.email },
    { $set: { temp_token: req.body.temp_token } },
    { new: true },
    (err, data) => {
      if (err) {
        // console.log(err);
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

//********************************UPDATE-USER-DATA***************************** */

exports.updateUserData = (req, res) => {
  UserSchema.findOneAndUpdate(
    { _id: req.query._id },
    { $set: req.body },
    { new: true },
    (err, data) => {
      if (err) {
        // console.log(err);
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

// ***************************get-data-by-id*******************/

exports.getUsersById = (req, res) => {
  UserSchema.find({ _id: req.query._id }, (err, data) => {
    if (err) {
      // console.log(err);
      let errorKeyArray = Object.keys(err.errors);
      s;
      let msgArray = errorKeyArray.map((obj) => {
        return err.errors[obj];
      });
      ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(", ") });
    } else ResponseObj.successResponse(res, data);
  });
};

//**********************DELETE-CELEBRITY***************************************** */
exports.DeleteUsers = (req, res) => {
  UserSchema.deleteOne({ _id: req.query._id }, { new: true }, (err, data) => {
    if (err) {
      // console.log(err);
      let errorKeyArray = Object.keys(err.errors);
      let msgArray = errorKeyArray.map((obj) => {
        return err.errors[obj];
      });
      ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(", ") });
    } else ResponseObj.successResponse(res, data);
  });
};
