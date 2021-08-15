const celebritiesSchema = require("../model/course.model");
const ResponseObj = require("../service/Response.service");

//*************FORM-DATA**************************** */

exports.AddCelebritiesFormData = (req, res) => {
  let registerObj = new celebritiesSchema(req.body);
  registerObj.save((err, mongoresponse) => {
    console.log("mopa", err, "mopa2", mongoresponse);
    if (err) {
      res.status(400).send({ response: "error" });
    } else ResponseObj.successResponse(res, mongoresponse);
  });
};

//***************ADD-CELEBRITY-IN-BODY************************************ */
exports.AddCelebrities = (req, res) => {
  let registerObj = new celebritiesSchema(req.body);
  registerObj.save((err, mongoresponse) => {
    if (err) {
      res.status(400).send({ response: "error" });
    } else ResponseObj.successResponse(res, mongoresponse);
  });
};

//************************GET-LIST-CELEBRITY-IN-BODY************************************ */

exports.getCelebritiesList = (req, res) => {
  celebritiesSchema.find((err, data) => {
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

exports.getCelebrityById = (req, res) => {
  celebritiesSchema.find({ _id: req.query._id }, (err, data) => {
    if (err) {
      res.status(400).send({ response: "error" });
    } else ResponseObj.successResponse(res, data);
  });
};

//***********************Get-Category-of-CELEBRITY************************* */

exports.getCelebrityByIdCategory = (req, res) => {
  celebritiesSchema.find(
    { category_id: req.query.category_id },
    (err, data) => {
      if (err) {
        res.status(400).send({ response: "error" });
      } else ResponseObj.successResponse(res, data);
    }
  );
};

//***********************SEARCH************************* */



exports.searchCalebrities = (req, res) => {
  if (req.query.q) {
    var searchedfield = {};
    searchedfield.name = { $regex: req.query.q, $options: "$i" };

    celebritiesSchema.find(searchedfield, (err, data) => {
      if (err) {
        res.status(400).send({ response: "error", type: "crash" });
      } else {
        if (data[0]) {
          res.status(200).send({ response: "ok", data: data });
        } else {
          res.status(200).send({ response: "error", type: "null" });
        }
      }
    });
  } else {
    res.status(200).send({ response: "error" });
  }
  return;
};

//**********************DELETE-CELEBRITY***************************************** */
exports.DeleteCelebrity = (req, res) => {
  celebritiesSchema.deleteOne(
    { _id: req.query._id },
    { new: true },
    (err, data) => {
      if (err) {
        res.status(400).send({ response: "error" });
      } else ResponseObj.successResponse(res, data);
    }
  );
};

//*****************UPDATE-CELEBRITY*********************************/
exports.UpdateCelebrity = (req, res) => {
  if (req.files) {
    if (req.files.image) converToBase64(req, "image");
    else req.body.image = req.body.image ? JSON.parse(req.body.image) : [];
    if (req.files.image_2) converToBase64(req, "image_2");
    else
      req.body.image_2 = req.body.image_2 ? JSON.parse(req.body.image_2) : [];
    if (req.files.image_3) converToBase64(req, "image_3");
    else
      req.body.image_3 = req.body.image_3 ? JSON.parse(req.body.image_3) : [];
  }
  // console.log("My Body",req.body);
  celebritiesSchema.findOneAndUpdate(
    { _id: req.query._id },
    { $set: req.body },
    { new: true },
    (err, data) => {
      if (err) {
        res.status(400).send({ response: "error" });
      } else ResponseObj.successResponse(res, data);
    }
  );
};

function converToBase64(req, key) {
  req.body[key] = [];
  req.body[key].push({
    imageName: req.files[key].name,
    imageSrc:
      `data:${req.files[key].mimetype};base64,` +
      req.files[key].data.toString("base64"),
  });
}

//*******************************************************************/
