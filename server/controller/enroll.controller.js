const enrollSchema = require("../model/enroll.model");
const ResponseObj = require("../service/Response.service");

//*************ENROLL-CELEBRITY-AGREEMENT******************* */



exports.AddEnroll = (req, res) => {
  let registerObj = new enrollSchema(req.body);
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




//*******************GET************************** */

exports.getEnrollList = (req, res) => {
  enrollSchema.find((err, data) => {
    if (err) {
      let errorKeyArray = Object.keys(err.errors);
      let msgArray = errorKeyArray.map((obj) => {
        return err.errors[obj];
      });
      ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(",") });
    } else ResponseObj.successResponse(res, data);
  });
};
