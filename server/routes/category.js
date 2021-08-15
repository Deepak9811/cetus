var express = require("express");
var router = express.Router();
var categoryController = require("../controller/category.controller");

//***********ADD-Image-form-data-CATEGORY********** */
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


router.post("/category", function (req, res, next) {
  if (req.files.image.length == 0) res.status(400).send("Image not found");
  req.body.image = [];

  if (req.files.image.size < 300000) {
    if (typeof req.files.image == "object") {
      req.body.image.push(
        `data:${req.files.image.mimetype};base64,` +
          req.files.image.data.toString("base64")
      );
      categoryController.AddCategory(req, res);
    } else
      req.files.image.map(async (obj, index) => {
        req.body.image.push(
          `data:${obj.mimetype};base64,` + obj.data.toString("base64")
        );
        if (req.files.image.length == index + 1) {
          categoryController.AddCategory(req, res);
        }
      });
  } else {
    ResponseObj.errorResponse(res, {
      status: 400,
      msg: "Image should be less than 200KB",
    });
  }
});

//*******************GET-CATEGORY********************************* */

router.get("/categorys", function (req, res, next) {
  categoryController.getCategoryList(req, res);
});

//*******************GET-CATEGORY-id********************************* */

router.get("/category", function (req, res, next) {
  categoryController.getCategoryById(req, res);
});

//*******************DELETE-CATEGORY********************************* */

router.delete("/category", function (req, res, next) {
  categoryController.DeleteCategory(req, res);
});

//*******************UPDATE-CATEGORY********************************* */

router.put("/category", function (req, res, next) {
  categoryController.UpdateCategory(req, res);
});

//**************update-categorie-status************************ */

router.put("/categorieUpdateUpdate", function (req, res, next) {
  categoryController.UpdateCategories(req, res);
});

module.exports = router;
