const PrdouctSchema = require("../model/product.model");
const ResponseObj = require("../service/Response.service");

exports.addProduct = (req, res) => {
  let registerObj = new PrdouctSchema(req.body);
  registerObj.save((err, mongoresponse) => {
    if (err) {
      let errorKeyArray = Object.keys(err.errors);
      let msgArray = errorKeyArray.map((obj) => {
        return err.errors[obj];
      });
      console.log(err);
      ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(", ") });
    } else ResponseObj.successResponse(res, mongoresponse);
  });
};
