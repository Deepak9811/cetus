const youTubeSchema = require("../model/youTube.model");
const ResponseObj = require("../service/Response.service");

exports.AddYouTubeFormData = (req, res) => {
  let registerObj = new youTubeSchema(req.body);
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


exports.getYouTubeList = (req, res) => {
    youTubeSchema.find((err, data) => {
      if (err) {
        let errorKeyArray = Object.keys(err.errors);
        let msgArray = errorKeyArray.map((obj) => {
          return err.errors[obj];
        });
        ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(", ") });
      } else ResponseObj.successResponse(res, data);
    });
  };


  exports.deleteyouTube = (req, res) => {
    youTubeSchema.deleteOne({ "_id": req.query._id }  
      ,{new:true},(err, data) => {
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