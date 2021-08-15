const bollywoodSchema = require("../model/bollywood.model");
const ResponseObj = require("../service/Response.service");

exports.AddBollywoodFormData = (req, res) => {
  let registerObj = new bollywoodSchema(req.body);
  registerObj.save((err, mongoresponse) => {
    if (err) {
      if(!err.errors)   ResponseObj.errorResponse(res, { status: 400, msg:err });
      if(err.errors){
        res.status(400).send({response:"error"}); 
      }
    } else ResponseObj.successResponse(res, mongoresponse);
  });
};


exports.getBollywoodList = (req, res) => {
    bollywoodSchema.find((err, data) => {
      if (err) {
        res.status(400).send({response:"error"}); 
      } else ResponseObj.successResponse(res, data);
    });
  };

  exports.deleteBollywood = (req, res) => {
    bollywoodSchema.deleteOne({ "_id": req.query._id }  
      ,{new:true},(err, data) => {
      if (err) {
        res.status(400).send({response:"error"}); 
      } else ResponseObj.successResponse(res, data);
    });
  };