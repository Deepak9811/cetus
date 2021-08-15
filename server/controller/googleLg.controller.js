// const { update } = require("../model/googleLgs.model");
const googleLgSchema = require("../model/googleLg.model");
const ResponseObj = require("../service/Response.service");
const TokenService = require("../service/Token.service");

//**********************ADD-googleLg******************************** */

exports.AddgoogleLg = (req, res) => {
  let registerObj = new googleLgSchema(req.body);
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

//**********************GET-googleLg******************************** */

exports.getgoogleLgsList = (req, res) => {
  googleLgSchema.find((err, data) => {
    if (err) {
      let errorKeyArray = Object.keys(err.errors);
      let msgArray = errorKeyArray.map((obj) => {
        return err.errors[obj];
      });
      ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(", ") });
    } else ResponseObj.successResponse(res, data);
  });
};


//********************************UPDATE-googleLg-DATA***************************** */

exports.updategoogleLgData = (req, res) => {
  googleLgSchema.findOneAndUpdate(
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

// ***************************get-data-by-id*******************/

exports.getgoogleLgsById = (req, res) => {
  googleLgSchema.find({ _id: req.query._id }, (err, data) => {
    if (err) {
      console.log(err);
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
exports.DeletegoogleLg = (req, res) => {
  googleLgSchema.deleteOne({ _id: req.query._id }, { new: true }, (err, data) => {
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
