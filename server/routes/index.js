var express = require("express");
var router = express.Router();
const ResponseObj = require("../service/Response.service");
const bannerController = require("../controller/banner.controller");
// const forgotController = require("../controller/forgot.controller");
const featuredController = require("../controller/featured.controller");
// const enrollController = require("../controller/enroll.controller");
const tvSerialController = require("../controller/tvSerial.controller");
const youTubeController = require("../controller/youTube.controller");
const socialMediaController = require("../controller/socialMedia.controller");
const mostPopularController = require("../controller/mostPopular.controller");
const bollywoodController = require("../controller/bollywood.controller");
const googleLgController = require("../controller/googleLg.controller");
const page_titleController = require("../controller/page_title.controller");
const CoupenController = require("../controller/Coupen.controller");
const couponManagController = require("../controller/couponManage.controller");

var razpayController = require("../controller/razpay.controller");
const bodyParser = require("body-parser");

// router.get("/", function (req, res, next) {
//   ResponseObj.successResponse(res, { username: "Deepak" });
// });

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//---------BANNERs-------------

router.post("/banner", function (req, res, next) {
  if (req.files.image.length == 0) res.status(400).send("Image not found");
  req.body.image = [];

  if (req.files.image.size < 300000) {
    if (typeof req.files.image == "object") {
      req.body.image.push(
        `data:${req.files.image.mimetype};base64,` +
          req.files.image.data.toString("base64")
      );
      bannerController.addBanner(req, res);
    } else
      req.files.image.map(async (obj, index) => {
        req.body.image.push(
          `data:${obj.mimetype};base64,` + obj.data.toString("base64")
        );
        if (req.files.image.length == index + 1) {
          bannerController.addBanner(req, res);
        }
      });
  } else {
    ResponseObj.errorResponse(res, {
      status: 400,
      msg: "Image should be less than 200KB",
    });
  }
});

router.get("/banners", function (req, res, next) {
  bannerController.getBannersList(req, res);
});

router.delete("/banner", function (req, res, next) {
  bannerController.DeleteBanner(req, res);
});


router.put("/banner", function (req, res, next) {
  bannerController.UpdateBanner(req, res);
});




// ---------------RAZPAY

router.post("/razpay", bodyParser.json(), function (req, res, next) {
  razpayController.getRazorPayOrderId(req, res);
});

//***********************FEATURED-FORM-DATA******************************************************* */

const imageToBase64 = require("image-to-base64");
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

router.post("/Add-featured-form-data", function (req, res, next) {
  if (req.files.image.length == 0) res.status(400).send("Image not found");
  req.body.image = [];
  if (typeof req.files.image == "object") {
    req.body.image.push({
      imageName: req.files.image.name,
      imageSrc:
        `data:${req.files.image.mimetype};base64,` +
        req.files.image.data.toString("base64"),
    });
    featuredController.AddFeaturedFormData(req, res);
  } else
    req.files.image.map(async (obj, index) => {
      req.body.image.push({
        imageName: obj.name,
        imageSrc: `data:${obj.mimetype};base64,` + obj.data.toString("base64"),
      });
      if (req.files.image.length == index + 1) {
        featuredController.AddFeaturedFormData(req, res);
      }
    });
});

router.get("/get-fetured-list", function (req, res, next) {
  featuredController.getFeaturedList(req, res);
});

router.delete("/featuredDelete", function (req, res, next) {
  featuredController.deletefeatured(req, res);
});

//************************************MOST-POPULAR******************************************** */

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

router.post("/Add-mostPopular-form-data", function (req, res, next) {
  if (req.files.image.length == 0) res.status(400).send("Image not found");
  req.body.image = [];
  if (typeof req.files.image == "object") {
    req.body.image.push({
      imageName: req.files.image.name,
      imageSrc:
        `data:${req.files.image.mimetype};base64,` +
        req.files.image.data.toString("base64"),
    });
    mostPopularController.AddMostPopularFormData(req, res);
  } else
    req.files.image.map(async (obj, index) => {
      req.body.image.push({
        imageName: obj.name,
        imageSrc: `data:${obj.mimetype};base64,` + obj.data.toString("base64"),
      });
      if (req.files.image.length == index + 1) {
        mostPopularController.AddMostPopularFormData(req, res);
      }
    });
});

router.get("/get-mostPopular-list", function (req, res, next) {
  mostPopularController.getFeaturedList(req, res);
});

router.delete("/mostPopularDelete", function (req, res, next) {
  mostPopularController.deletemostPopular(req, res);
});

//************************************BOLLYWOOD*************************************************** */

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

router.post("/Add-bollywood-form-data", function (req, res, next) {
  if (req.files.image.length == 0) res.status(400).send("Image not found");
  req.body.image = [];
  if (typeof req.files.image == "object") {
    req.body.image.push({
      imageName: req.files.image.name,
      imageSrc:
        `data:${req.files.image.mimetype};base64,` +
        req.files.image.data.toString("base64"),
    });
    bollywoodController.AddBollywoodFormData(req, res);
  } else
    req.files.image.map(async (obj, index) => {
      req.body.image.push({
        imageName: obj.name,
        imageSrc: `data:${obj.mimetype};base64,` + obj.data.toString("base64"),
      });
      if (req.files.image.length == index + 1) {
        bollywoodController.AddBollywoodFormData(req, res);
      }
    });
});

router.get("/get-bollywood-list", function (req, res, next) {
  bollywoodController.getBollywoodList(req, res);
});

router.delete("/bollywoodDelete", function (req, res, next) {
  bollywoodController.deleteBollywood(req, res);
});

//************************************TV-SERIAL*************************************************** */

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

router.post("/Add-tvSerial-form-data", function (req, res, next) {
  if (req.files.image.length == 0) res.status(400).send("Image not found");
  req.body.image = [];
  if (typeof req.files.image == "object") {
    req.body.image.push({
      imageName: req.files.image.name,
      imageSrc:
        `data:${req.files.image.mimetype};base64,` +
        req.files.image.data.toString("base64"),
    });
    tvSerialController.AddTvSerialFormData(req, res);
  } else
    req.files.image.map(async (obj, index) => {
      req.body.image.push({
        imageName: obj.name,
        imageSrc: `data:${obj.mimetype};base64,` + obj.data.toString("base64"),
      });
      if (req.files.image.length == index + 1) {
        tvSerialController.AddTvSerialFormData(req, res);
      }
    });
});

router.get("/get-tvSerial-list", function (req, res, next) {
  tvSerialController.getTvSerialList(req, res);
});

router.delete("/tvSeriesDelete", function (req, res, next) {
  tvSerialController.deletetvSeries(req, res);
});

//************************************YouTube*************************************************** */

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

router.post("/Add-youTube-form-data", function (req, res, next) {
  if (req.files.image.length == 0) res.status(400).send("Image not found");
  req.body.image = [];
  if (typeof req.files.image == "object") {
    req.body.image.push({
      imageName: req.files.image.name,
      imageSrc:
        `data:${req.files.image.mimetype};base64,` +
        req.files.image.data.toString("base64"),
    });
    youTubeController.AddYouTubeFormData(req, res);
  } else
    req.files.image.map(async (obj, index) => {
      req.body.image.push({
        imageName: obj.name,
        imageSrc: `data:${obj.mimetype};base64,` + obj.data.toString("base64"),
      });
      if (req.files.image.length == index + 1) {
        youTubeController.AddYouTubeFormData(req, res);
      }
    });
});

router.get("/get-youTube-list", function (req, res, next) {
  youTubeController.getYouTubeList(req, res);
});

router.delete("/youTubeDelete", function (req, res, next) {
  youTubeController.deleteyouTube(req, res);
});

//************************************YouTube*************************************************** */

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

router.post("/Add-socialMedia-form-data", function (req, res, next) {
  if (req.files.image.length == 0) res.status(400).send("Image not found");
  req.body.image = [];
  if (typeof req.files.image == "object") {
    req.body.image.push({
      imageName: req.files.image.name,
      imageSrc:
        `data:${req.files.image.mimetype};base64,` +
        req.files.image.data.toString("base64"),
    });
    socialMediaController.AddSocialMediaFormData(req, res);
  } else
    req.files.image.map(async (obj, index) => {
      req.body.image.push({
        imageName: obj.name,
        imageSrc: `data:${obj.mimetype};base64,` + obj.data.toString("base64"),
      });
      if (req.files.image.length == index + 1) {
        socialMediaController.AddSocialMediaFormData(req, res);
      }
    });
});

router.get("/get-socialMedia-list", function (req, res, next) {
  socialMediaController.getSocialMediaList(req, res);
});

router.delete("/socialMediaDelete", function (req, res, next) {
  socialMediaController.deletesocialMedia(req, res);
});

//**************************GOOGLE-LOG-IN-DATA*******************************/

router.post("/googleLog", function (req, res, next) {
  googleLgController.AddgoogleLg(req, res);
});

router.put("/googleLog", function (req, res, next) {
  googleLgController.updategoogleLgData(req, res);
});

router.get("/googleLog", function (req, res, next) {
  googleLgController.getgoogleLgsList(req, res);
});

router.get("/get-googleLog", function (req, res, next) {
  googleLgController.getgoogleLgsList(req, res);
});

router.delete("/googleLog", function (req, res, next) {
  googleLgController.DeletegoogleLg(req, res);
});

//**************************PAGE-TITLE*******************************/

router.post("/page_title", function (req, res, next) {
  page_titleController.Addpage_title(req, res);
});

router.get("/page_title", function (req, res, next) {
  page_titleController.getpage_titleList(req, res);
});

router.get("/id-page_title", function (req, res, next) {
  page_titleController.getpage_titleById(req, res);
});

router.put("/page_title", function (req, res, next) {
  page_titleController.Updatepage_title(req, res);
});

router.delete("/page_title", function (req, res, next) {
  page_titleController.Deletepage_title(req, res);
});

//**************************COUPEN*******************************/

router.post("/coupon", function (req, res, next) {
  CoupenController.AddCoupen(req, res);
});

router.get("/coupons", function (req, res, next) {
  CoupenController.getCoupenList(req, res);
});

router.get("/coupon", function (req, res, next) {
  CoupenController.getCoupenById(req, res);
});

router.put("/coupon", function (req, res, next) {
  CoupenController.UpdateCoupen(req, res);
});

router.delete("/coupon", function (req, res, next) {
  CoupenController.DeleteCoupen(req, res);
});

router.post("/check-coupon", function (req, res, next) {
  CoupenController.CheckCoupenRegister(req, res);
});

// >>>>>>Coupon_code
router.post("/check-couponCode", function (req, res, next) {
  CoupenController.CheckcouponRegister(req, res);
});

router.get("/coupon-code", function (req, res, next) {
  CoupenController.getCoupenCode(req, res);
});

//**************************couponManag*******************************/

router.post("/couponManage", function (req, res, next) {
  couponManagController.AddcouponManag(req, res);
});

router.get("/couponManages", function (req, res, next) {
  couponManagController.getcouponManagList(req, res);
});

router.get("/couponManage", function (req, res, next) {
  couponManagController.getcouponManagById(req, res);
});

router.put("/couponManage", function (req, res, next) {
  couponManagController.UpdatecouponManag(req, res);
});

router.delete("/couponManage", function (req, res, next) {
  couponManagController.DeletecouponManag(req, res);
});

router.post("/check-couponManage", function (req, res, next) {
  couponManagController.CheckcouponManagRegister(req, res);
});

module.exports = router;
