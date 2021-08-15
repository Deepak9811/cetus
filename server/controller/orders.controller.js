const ordersSchema = require("../model/orders.model");
const ResponseObj = require("../service/Response.service");


//*******************ADD-ORDER************************** */
exports.AddOrders = (req, res) => {
  let registerObj = new ordersSchema(req.body);
  registerObj.save((err, mongoresponse) => {
    if (err) {
      let errorKeyArray = Object.keys(err.errors);
      let msgArray = errorKeyArray.map((obj) => {
        return err.errors[obj];
      });
      console.log(err);
      ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(",") });
    } else ResponseObj.successResponse(res, mongoresponse);
  });
};



//*******************GET-ORDER************************** */

exports.getOrdersList = (req, res) => {
  ordersSchema.find((err, data) => {
    if (err) {
      let errorKeyArray = Object.keys(err.errors);
      let msgArray = errorKeyArray.map((obj) => {
        return err.errors[obj];
      });
      ResponseObj.errorResponse(res, { status: 400, msg: msgArray.join(",") });
    } else ResponseObj.successResponse(res, data);
  });
};

// *************************GET-ORDER-BY-ID*********************************



exports.getById = (req, res) => {
  ordersSchema.find({ _id: req.query._id }, (err, data) => {
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


//**********************UPDATE-ORDERS-STATUS************************************ */


exports.UpdateOrders = (req, res) => {
  ordersSchema.findOneAndUpdate({ "_id": req.query._id } ,{$set:{status:req.body.status}} 
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


// *************************GET-ORDER(userId)-BY-ID*********************************



exports.getOrderById = (req, res) => {
  ordersSchema.find({ userId: req.query.userId }, (err, data) => {
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


// *************************GET-ORDER(celebrityId)-BY-ID*********************************

exports.getOrderCelebrityId = (req, res) => {
  ordersSchema.find({ celebrityId: req.query.celebrityId }, (err, data) => {
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

//**********************DELETE-CELEBRITY***************************************** */
exports.DeleteOrder = (req, res) => {
  ordersSchema.deleteOne({ "_id": req.query._id }  
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