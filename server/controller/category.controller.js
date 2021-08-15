const categorySchema = require("../model/category.model");
const ResponseObj = require("../service/Response.service");

//*****************ADD-CATEGORY-FORM-DATA***************************** */

exports.AddCategory = (req, res) => {
  let registerObj = new categorySchema(req.body);
  registerObj.save((err, mongoresponse) => {
    if (err) {
      res.status(400).send({response:"error"}); 
    } else ResponseObj.successResponse(res, mongoresponse);
  });
};


//*****************GET-CATEGORY-FORM-DATA***************************** */

exports.getCategoryList = (req, res) => {
  categorySchema.find((err, data) => {
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

//***************************GET-DATA-BY-ID************************************ */

exports.getCategoryById = (req, res) => {
  categorySchema.find({ _id: req.query._id }, (err, data) => {
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

//**********************DELETE-CELEBRITY***************************************** */

exports.DeleteCategory = (req, res) => {
  categorySchema.deleteOne(
    { _id: req.query._id },
    { new: true },
    (err, data) => {
      if (err) {
        res.status(400).send({response:"error"}); 
      } else ResponseObj.successResponse(res, data);
    }
  );
};


//*****************UPDATE-CATEGORY*********************************/

exports.UpdateCategory = (req, res) => {
  if(req.files){
    if(req.files.image) converToBase64(req,"image");
    else req.body.image = req.body.image ? JSON.parse(req.body.image) : [];
  }
  // console.log("My Body",req.body);
  categorySchema.findOneAndUpdate({ "_id": req.query._id } ,{$set:req.body} 
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

//**********************UPDATE-Categories-STATUS************************************ */


exports.UpdateCategories = (req, res) => {
  categorySchema.findOneAndUpdate({ "_id": req.query._id } ,{$set:{Category_status:req.body.Category_status}} 
    ,{new:true},(err, data) => {
    if (err) {
      res.status(400).send({response:"error"}); 
    } else ResponseObj.successResponse(res, data);
  });
};