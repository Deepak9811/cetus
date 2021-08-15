// const forgotSchema = require("../model/orders.model");
// const ResponseObj = require("../service/Response.service");


// //*******************ADD-ORDER************************** */
// exports.Addforgot = (req, res) => {
//   let registerObj = new forgotSchema(req.body);
//   registerObj.save((err, mongoresponse) => {
//     if (err) {
//       let errorKeyArray = Object.keys(err.errors);
//       let msgArray = errorKeyArray.map((obj) => {
//         return err.errors[obj];
//       });
//       console.log(err);
//       ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(",") });
//     } else ResponseObj.successResponse(res, mongoresponse);
//   });
// };


// //*******************GET-ORDER************************** */

// exports.getforgot = (req, res) => {
//   forgotSchema.find((err, data) => {
//     if (err) {
//       let errorKeyArray = Object.keys(err.errors);
//       let msgArray = errorKeyArray.map((obj) => {
//         return err.errors[obj];
//       });
//       ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(",") });
//     } else ResponseObj.successResponse(res, data);
//   });
// };
