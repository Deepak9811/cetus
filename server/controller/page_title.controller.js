const page_titleSchema = require("../model/page_title.model");
const ResponseObj = require("../service/Response.service");

//*****************ADD-page_title-FORM-DATA***************************** */

exports.Addpage_title = (req, res) => {
  let registerObj = new page_titleSchema(req.body);
  registerObj.save((err, mongoresponse) => {
    if (err) {
      let errorKeyArray = Object.keys(err.errors);
      let msgArray = errorKeyArray.map((obj) => {
        return err.errors[obj];
      });
      console.log(err);
      ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(",") });
    } else ResponseObj.successResponse(res, mongoresponse);
  });
};

//*****************GET-page_title-FORM-DATA***************************** */

exports.getpage_titleList = (req, res) => {
  page_titleSchema.find((err, data) => {
    if (err) {
      let errorKeyArray = Object.keys(err.errors);
      let msgArray = errorKeyArray.map((obj) => {
        return err.errors[obj];
      });
      ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(",") });
    } else ResponseObj.successResponse(res, data);
  });
};

//***************************GET-DATA-BY-ID************************************ */

exports.getpage_titleById = (req, res) => {
  page_titleSchema.find({ _id: req.query._id }, (err, data) => {
    if (err) {
      console.log(err);
      let errorKeyArray = Object.keys(err.errors);
      s;
      let msgArray = errorKeyArray.map((obj) => {
        return err.errors[obj];
      });
      ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(", ") });
    } else ResponseObj.successResponse(res, data[0]);
  });
};

//**********************DELETE-Page_title***************************************** */

exports.Deletepage_title = (req, res) => {
  page_titleSchema.deleteOne(
    { _id: req.query._id },
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

//**********************UPDATE-Categories-STATUS************************************ */

exports.Updatepage_title = (req, res) => {
  page_titleSchema.findOneAndUpdate(
    { _id: req.query._id },
    { $set: req.body },
    { new: true },
    (err, data) => {
      if (err) {
        console.log(err);
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
