const socialMediaSchema = require("../model/socialMedia.model");
const ResponseObj = require("../service/Response.service");

exports.AddSocialMediaFormData = (req, res) => {
  let registerObj = new socialMediaSchema(req.body);
  registerObj.save((err, mongoresponse) => {
    if (err) {
      if (!err.errors)
        ResponseObj.errorResponse(res, { status: 400, msg: err });
      if (err.errors) {
        let errorKeyArray = Object.keys(err.errors);
        let msgArray = errorKeyArray.map((obj) => {
          return err.errors[obj];
        });

        ResponseObj.errorResponse(res, {
          status: 400,
          msg: msgArray.join(", "),
        });
      }
    } else ResponseObj.successResponse(res, mongoresponse);
  });
};

exports.getSocialMediaList = (req, res) => {
  socialMediaSchema.find((err, data) => {
    if (err) {
      console.log("Error", err);
      res.status(200).send({ response: "error", type: "crash" });
    } else {
      if (data.length !== 0) {
        res.status(200).send({ response: "ok", data: data });
      } else {
        res.status(200).send({ response: "error", data: "not_exist" });
      }
    }
  });
};


exports.deletesocialMedia = (req, res) => {
  socialMediaSchema.deleteOne(
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
