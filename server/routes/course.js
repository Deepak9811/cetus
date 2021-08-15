var express = require("express");
var router = express.Router();
const celebritiesController = require("../controller/course.controller");
const ResponseObj = require("../service/Response.service");
const celebritiesSchema = require("../model/course.model");

//***********Image-form-data********** */

var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).array("image", 20);

router.post("/course", function (req, res, next) {
  if (req.files.image.length == 0) res.status(400).send("Image not found");
  req.body.image = [];
  req.body.image_2 = [];
  req.body.image_3 = [];
  if (typeof req.files.image == "object") {
    req.body.image.push({
      imageName: req.files.image.name,
      imageSrc:
        `data:${req.files.image.mimetype};base64,` +
        req.files.image.data.toString("base64"),
    });
    if (req.files.image_2) {
      req.body.image_2.push({
        imageName: req.files.image_2.name,
        imageSrc:
          `data:${req.files.image_2.mimetype};base64,` +
          req.files.image_2.data.toString("base64"),
      });
    } else {
      req.body.image_2 = [];
    }

    if (req.files.image_3) {
      req.body.image_3.push({
        imageName: req.files.image_3.name,
        imageSrc:
          `data:${req.files.image_3.mimetype};base64,` +
          req.files.image_3.data.toString("base64"),
      });
    } else {
      req.body.image_3 = [];
    }

    celebritiesController.AddCelebritiesFormData(req, res);
  } else
    req.files.image.map(async (obj, index) => {
      req.body.image.push({
        imageName: obj.name,
        imageSrc: `data:${obj.mimetype};base64,` + obj.data.toString("base64"),
      });
      if (req.files.image.length == index + 1) {
        celebritiesController.AddCelebritiesFormData(req, res);
      }
      //  celebritiesController.AddCelebritiesFormData(req, res);
    });
});

//********************************************* */

router.post("/Add-celebrities", function (req, res, next) {
  celebritiesController.AddCelebrities(req, res);
});

router.get("/search", function (req, res, next) {
  celebritiesController.searchCalebrities(req, res);
});

// >>>>>>>>>SEARCH-RAMANAND>>>>>>>>>>>>>

// router.get("/searchC", (req, res, next) => {
//   const searchedfield = req.query.name;
//   celebritiesSchema
//     .find({ name: { $regex: searchedfield, $options: "$1" } })
//     .then((data) => {
//       res.send(data);
//     });
// });

router.get("/courses", function (req, res, next) {
  celebritiesController.getCelebritiesList(req, res);
});

//*********GET-BY-ID-CELEBRITY*************** */
router.get("/course", function (req, res, next) {
  celebritiesController.getCelebrityById(req, res);
});

//*********GET-CELEBRITY-CATEGORY*************** */

router.get("/courseCategory", function (req, res, next) {
  celebritiesController.getCelebrityByIdCategory(req, res);
});

//*********UPDATE-CELEBRITY*************** */
router.put("/course", function (req, res, next) {
  celebritiesController.UpdateCelebrity(req, res);
});

//*******************DELETE-CELEBRITY******************************* */
router.delete("/course", function (req, res, next) {
  celebritiesController.DeleteCelebrity(req, res);
});

module.exports = router;
