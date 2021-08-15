const BannerSchema = require("../model/banner.model");
const ResponseObj = require("../service/Response.service");

//-------ADD-BANNER

exports.addBanner = (req, res) => {
  let registerObj = new BannerSchema(req.body);
  registerObj.save((err, mongoresponse) => {
    if (err) {
      res.status(400).send({response:"error",data:null});
    } else ResponseObj.successResponse(res, mongoresponse);
  });
};

//-----------GET-ALL-DATA
exports.getBannersList = (req, res) => {
  BannerSchema.find((err, mongoresponse) => {
    if (err) {
      console.log("Error", err);
      res.status(200).send({ response: "error", type: "crash" });
    } else {
      if (mongoresponse.length !== 0) {
        res.status(200).send({ response: "ok", data: mongoresponse });
      } else {
        res.status(200).send({ response: "error", data: "not_exist" });
      }
    }
  });
};


//------------DELETE---DATA

exports.DeleteBanner = (req, res) => {
  BannerSchema.deleteOne({ _id: req.query._id }, { new: true }, (err, data) => {
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



//*****************UPDATE-CATEGORY*********************************/

exports.UpdateBanner = (req, res) => {
  if(req.files){
    if(req.files.image) converToBase64(req,"image");
    else req.body.image = req.body.image ? JSON.parse(req.body.image) : [];
  }
  // console.log("My Body",req.body);
  BannerSchema.findOneAndUpdate({ "_id": req.query._id } ,{$set:req.body} 
    ,{new:true},(err, data) => {
    if (err) {
      res.status(400).send({response:"error"}); 
    } else ResponseObj.successResponse(res, data);
  });
};


function converToBase64(req,key){
  req.body[key]=[];
  req.body[key].push({"imageName":req.files[key].name,"imageSrc":`data:${req.files[key].mimetype};base64,`+req.files[key].data.toString("base64")});  
}