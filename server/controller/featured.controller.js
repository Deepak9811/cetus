const featuredSchema = require("../model/featured.model");
const ResponseObj = require("../service/Response.service");

exports.AddFeaturedFormData = (req, res) => {
  let registerObj = new featuredSchema(req.body);
  registerObj.save((err, mongoresponse) => {
    if (err) {
      if(!err.errors)   ResponseObj.errorResponse(res, { status: 400, msg:err });
      if(err.errors){
        let errorKeyArray = Object.keys(err.errors);
        let msgArray = errorKeyArray.map((obj) => {
          return err.errors[obj];
        });
       
        ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(", ") });
      }
    } else ResponseObj.successResponse(res, mongoresponse);
  });
};


exports.getFeaturedList = (req, res) => {
    featuredSchema.find((err, data) => {
      if (err) {
        let errorKeyArray = Object.keys(err.errors);
        let msgArray = errorKeyArray.map((obj) => {
          return err.errors[obj];
        });
        ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(", ") });
      } else ResponseObj.successResponse(res, data);
    });
  };



  
  exports.deletefeatured = (req, res) => {
    featuredSchema.deleteOne({ "_id": req.query._id }  
      ,{new:true},(err, data) => {
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