var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var jsonparser = bodyParser.json();


const fetch = require('node-fetch');

const constandS = require("./service/Contanst");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var courseRouter = require("./routes/course");
var orderRouter = require("./routes/orders");
var categoryRouter = require("./routes/category");
const upload = require("express-fileupload");

var app = express();
app.use(express.static("./image"));
// Then you can set a middleware for express-fileupload

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const baseUrl = "";
app.use(cors({ origin: "*" }));
app.use(upload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/*+json" }));

// var transport_old = nodeMailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   service: "gmail",
//   secure: true,
//   requireTLS: true,
//   auth: {
//     user: Mailfrom,
//     pass: "Operations@celebze123#",

// user: "farmaanrafai800@gmail.com",
// pass: "##farmaan800",

var Mailfrom = "info@celebze.com";
const nodemailer = require("nodemailer");

const smtpTransport = require("nodemailer-smtp-transport");

let transport = nodemailer.createTransport(
  (smtpTransport,
  {
    name: "mail.celebze.com",
    pool: true,
    sendmail: true,
    host: "mail.celebze.com",
    port: 587,
    secure: false,
    auth: {
      user: "info@celebze.com",
      pass: "##0303@celeB",
    },
    tls: {
      rejectUnauthorized: false,
    },
  })
);

var inlineBase64 = require("nodemailer-plugin-inline-base64");
transport.use("compile", inlineBase64({ cidPrefix: "somePrefix_" }));


app.post("/contact", jsonparser, function (req, res) {
  //Enroll
  var mailToCompany;
  if (req.body.form_type == 1) {
    var mailToCompany = {
      from: Mailfrom,
      to: `${req.body.mail_to}`,
      subject: `${req.body.subject}`,
      html: `1 new inquery, from ${req.body.site}, details here 
      <br/> Name : ${req.body.name} 
      <br/> Email : ${req.body.email} 
      <br/> Phone Number : ${req.body.phone} 
      <br/> Choosed Platform: ${req.body.choose_platform}
      <br/> Handle platform: ${req.body.handle_platform}
      <br/> Social Platform Handle: ${req.body.social_platform_handle}
      <br/> On Boarding Process: ${req.body.on_boarding_process}
      <br/> Category: ${req.body.category}
      <br/> Total Followers: ${req.body.total_followers}
      <br/> Social Platform: ${req.body.social_platform}
      <br/> Best Option Covers: ${req.body.best_option_covers}
      <br/> DOB: ${req.body.dob}
      <br/> Description: ${req.body.description}`,
    };
  }

  //Celebrity Agreement
  else if (req.body.form_type == 2) {
    var mailToCompany = {
      from: Mailfrom,
      to: `${req.body.mail_to}`,
      subject: `${req.body.subject}`,
      html: `1 new inquery, from ${req.body.site}, details here 
      <br/> Name : ${req.body.name} 
      <br/> Email : ${req.body.email} 
      <br/> SO/WO : ${req.body.s_o_w_o} 
      <br/> Screen Name: ${req.body.screen_name}
      <br/> Profession: ${req.body.profession}
      <br/> Resident of: ${req.body.resident_of}
      <br/> Permanent Address : ${req.body.permanent_address}
      <br/> Mobile : ${req.body.mobile}
      <br/> Website : ${req.body.website}
      <br/> Any other social platform : ${req.body.any_other_social_platform}
      <br/> Bank Detail : ${req.body.bank_detail}
      <br/> Bank Branch Address : ${req.body.bank_branch_address}
      <br/> Account Holder Name : ${req.body.account_holder_name}
      <br/> Account No : ${req.body.account_no}
      <br/> Bank Swift : ${req.body.bank_swift}
      <br/> Aadhar : ${req.body.aadhar}
      <br/> IFSC : ${req.body.ifsc}
      <br/> Pan : ${req.body.pan}
      <br/> GST detail : ${req.body.gst_detail}
      <br/> Name of Company : ${req.body.name_of_company}
      <br/> GSTIN Reg No : ${req.body.gstin_reg_no}
      <br/>  State : ${req.body.state_} `,
    };
  }

  //For Password Recovery
  else if (req.body.form_type == 3) {
    var mailToCompany = {
      from: Mailfrom,
      to: `${req.body.mail_to}`,
      subject: `Password Recovery`,
      text: `Your code for password recovery is : ${req.body.temp_token}`,
    };
  }

  //For Contact Us
  else if (req.body.form_type == 4) {
    var mailToCompany = {
      from: Mailfrom,
      to: `${req.body.mail_to}`,
      subject: `For Contact Us`,
      html: `<div style="max-width:500px;color:red">Contact Details, from ${req.body.site} </div>
      <br/>  Details here
      <br/> 1.Name : ${req.body.name} 
      <br/> 2.Email : ${req.body.email} 
      <br/> 3.Phone : ${req.body.phone}
      <br/> 4.Description: ${req.body.description}  `,
    };
  }

  //FOR THANK YOU
  else if (req.body.form_type == 5) {
    var cid = req.body.celebrityId;
    fetch(`http://localhost:8080/upload/celebrities?_id=${cid}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
    .then((data)=>{
      data.json().then((resp)=>{

        var mailToCompany = {
          from: Mailfrom,
          to: `${req.body.mail_to}`,
          subject: `Thank You For Request`,
          html: `
    
          <div style="width: 100%;float: left;background-color: #f5f5e1">
            <div style="width: 100%; float: left; margin-bottom: 3% ">
              <img src="https://api-dot-project424.appspot.com/image/thnks.jpeg" style="width: 100%; float: left; margin-bottom: 3% ">
            </div>
            <div style="width: 100%; float: left; margin-bottom: 3% ">
              <h1 style="width: 100%; float: left;text-align: center">
                    Summary
              </h1>
            </div>
    
            <div style="width: 100%;float: left;border-bottom: 2px solid #dadce0">
              <ul style="width: 100%; float: left; list-style: none;padding: 0; ">
    
              <li style="width: 60%">
              <div style="width: 20%; float: left;margin-right: 3%;">
                      <img src="${resp.data[0].image[0].imageSrc}" 
                          style="width: 100%; float: left;border-radius: 10px;box-shadow: -3px 3px 7px -2px #777;">
                        </div>
                   </li>
    
                <li style="width: 40%; float: left; text-align: left" >
                  <div style="width: 100%; float: left; text-align: left ">
                    <h3 style="width: 100%; float: left; color: #7b7b7b ;margin:0;font-size: 1.2pc;" >
                      Celebrity Name
                    </h3>
                  </div>
    
                  <div style="width: 100%;float: left;text-align: left">
                    <h3 style="width: 100%; float: left;margin: 5px " >${
                      req.body.celebrity_name
                    }</h3>
                  </div>
    
                  <div style="width: 100%; float: left; text-align: left">
                    <h3 style="width: 100%; float: left; color: #7b7b7b;margin: 5% 0px 0px 0px;font-size: 1.2pc;" >
                      Prefered Date
                    </h3>
                  </div>
                  <div style="width: 100%; float: left; text-align: left" >
                    <h3 style="width: 100%; float: left;margin: 5px" >
                    ${req.body.need_date}
                    </h3>
                  </div>
                </li>
    
                <li style="width: 40%; float: left; text-align: left">
                  <div style="width: 100%; float: left; text-align: left">
                    <h3 style="width: 100%; float: left; color: #7b7b7b;margin: 0;font-size: 1.2pc;">
                      Request For
                    </h3>
                  </div>
    
                  <div style="width: 100%;float: left;text-align: left">
                    <h3 style="width: 100%; float: left;margin: 5px; ">${
                      req.body.order_type
                    }</h3>
                  </div>
    
                  <div style="width: 100%; float: left; text-align: left">
        <h3 style="width: 100%; float: left; color: #7b7b7b;font-size: 1.2pc;margin: 5% 0px 0px 0px;">
                      Booked For
                    </h3>
                  </div>
                  <div style="width: 100%; float: left; text-align: left" >
                    <h3 style="width: 100%; float: left;margin: 5px;" >
              ${req.body.customer_name ? ` ${req.body.customer_name}` : ``}
              ${req.body.request_from ? ` ${req.body.request_from}` : ``}
                    </h3>
                  </div>
    
    
                  <div style="width: 100%; float: left; text-align: left">
        <h3 style="width: 100%; float: left; color: #7b7b7b;font-size: 1.2pc;margin: 5% 0px 0px 0px;">
                    Message Text
                    </h3>
                  </div>
                  <div style="width: 100%; float: left; text-align: left" >
                    <h3 style="width: 100%; float: left;margin: 5px;" >${req.body.message_text}
                    </h3>
                  </div>
    
                </li>
              </ul>
            </div>
    
            <div style="width: 100%; float: left;margin-top:3%" >
              <ul style="width: 100%; float: left; list-style: none;margin: 0;padding: 0;" >
    
                <li style="width: 40%; float: left; text-align: left">
                  <div style="width: 100%; float: left; text-align: left;" >
                    <h3 style="width: 100%; float: left; color: #7b7b7b;font-size: 1.2pc;margin: 0;" >
                      Amount Paid
                    </h3>
                  </div>
    
                  <div style="width: 100%;float: left;text-align: left;margin-bottom: 4%">
                    <h3 style="width: 100%; float: left;margin: 5px" >₹${req.body.total_payment
                    }</h3>
                    <h6 style="margin: 5px">Inc of GST</h6>
                  </div>
                </li>
    
                <li style="width: 40%; float: left; text-align: left" >
                  <div style="width: 100%; float: left; text-align: left;" >
                    <h3 style="width: 100%; float: left; color: #7b7b7b;margin: 0;font-size: 1.2pc;">
                      Bill to
                    </h3>
                  </div>
    
                  <div style="width: 100%;float: left;text-align: left">
                    <h3 style="width: 100%; float: left;margin: 0" >
                    ${req.body.customer_name ? ` ${req.body.customer_name}` : ``}
                    </h3>
                  </div>
    
                  <div style="width: 100%;float: left;text-align: left">
                    <h4 style="width: 100%; float: left;margin: 0;" >
                    ${req.body.customer_email ? ` ${req.body.customer_email}` : ``}
                    </h4>
                    <h4 style="width: 100%; float: left;margin: 0">
                    ${req.body.customer_phone}
                    </h4>
                  </div>
                </li>
              </ul>
            </div>
    
            <div style="width: 100%; float: left; margin-bottom: 3% ; margin-top: 10% ">
              <img src="https://api-dot-project424.appspot.com/image/thnks_2.jpeg" style="width: 100%; float: left ">
            </div>
    
            <div style="width: 100%; float: left">
            <h2 style="width: 100%; float: left; text-align: center">#UNBOX YOUR WISH</h2>
            </div>
          </div>
          `,
        };

        transport.sendMail(mailToCompany, function (err, info) {
          if (err) {
            res.status(201).json({ response: "error_in_company", err: err });
          } else {
            console.log("sent2");
            res.status(200).json({ response: "ok" });
          }
        });


      })
    }).catch(()=> {
      console.log("error");
  });



    
  }

  //SEND ORDER DATA TO OWNER
  else if (req.body.form_type == 6) {
    var mailToCompany = {
      from: Mailfrom,
      to: `${req.body.mail_to}`,
      subject: `Oreder's Request`,
      html: `Request Details,From Celebze.com 

      <div style="max-width:500px;color:red">Summary </div>

      <div style="width: 100%; float: left;background-color: #fde3e3">
          <ul style="width: 100%; float: left;list-style: none;padding: 5%">
            <li style="width: 30%; float: left;text-align:center">
              <div style=width: "100%"; float: "left"><br/>celebrity Id : ${
                req.body.celebrityId
              }</div>
              <div style="width: 100%; float: left;color: black;margin-top: 5%">
              <br/>Celebrity Name : ${req.body.celebrity_name}</div>
            </li>

            <li style="width: 30%; float: left;text-align:center">
              <div style=width: "100%"; float: "left">
              <br/>User Id : ${req.body.userId}
              </div>

              <div style="width: 100%; float: left;color: black;margin-top:5%">
    ${
      req.body.customer_email
        ? `<br/>Customer Email : ${req.body.customer_email}`
        : ``
    }
    ${
      req.body.customer_name
        ? `<br/>Customer Name : ${req.body.customer_name}`
        : ``
    }

    <br/>Customer Phone : ${req.body.customer_phone}
    ${req.body.request_to ? `<br/>Request To : ${req.body.request_to}` : ``}
    ${
      req.body.request_from
        ? `<br/>Request From : ${req.body.request_from}`
        : ``
    }
              </div>

              <div style="width: 100%; float: left;color: black;margin-top:5%">
              <br/>Message Text : ${req.body.message_text}
              </div>
            </li>

            <li style="width: 30%; float: left;text-align:center">
            <div style="width: 100%; float: left">
            <br/>Booking Date : ${req.body.date}
            </div>

            <div style="width: 100%; float: left;color: black;margin-top:5%">
            <br/>Need Date : ${req.body.need_date}</div>
          </li>

          <li style="width: 30%; float: left;text-align:center">
            <div style="width: 100%; float: left">
        <br/>Order Type : ${req.body.order_type} 
${
  req.body.instagram_user
    ? `<br/>Instagram Id : ${req.body.instagram_user}`
    : ``
}

            <br/>Total Payment : ${req.body.total_payment}
            <br/>subtotal : ${req.body.subtotal}
            <br/>Private Request : ${req.body.private_request}
            </div>
          </li>
          </ul>
        </div>
      `,
    };
  }

  // MAIL TO COMPANY
  if(req.body.form_type !== 5){
    transport.sendMail(mailToCompany, function (err, info) {
      if (err) {
        res.status(201).json({ response: "error_in_company", err: err });
      } else {
        console.log("sent2");
        res.status(200).json({ response: "ok" });
      }
    });
  }

});

// Forgot-password
app.post("/forgot-password", jsonparser, function (req, res) {
  // res.status(201).json({ 'response': 'front', 'email' : req.body.email})

  //Enroll
  var ForgotMailToUser = {
    from: Mailfrom,
    to: `${req.body.mail_to}`,
    subject: `${req.body.subject}`,
    text: `
      Please click on the below link to change your password :  https://celebze.com/email_id=${req.body.site}, details here , Name : ${req.body.name} , Email : ${req.body.email} , Phone Number : ${req.body.phone} , Choosed Platform: ${req.body.choose_platform}, Handle platform: ${req.body.handle_platform}, Social Platform Handle: ${req.body.social_platform_handle}, On Boarding Process: ${req.body.on_boarding_process}, Gender: ${req.body.gender}, Category: ${req.body.category}, Total Followers: ${req.body.total_followers}, Social Platform: ${req.body.social_platform}, Best Option Covers: ${req.body.best_option_covers}, DOB: ${req.body.dob}, Description: ${req.body.description}`,
  };

  // MAIL TO COMPANY
  transport.sendMail(ForgotMailToUser, function (err, info) {
    if (err) {
      console.log(err);
      res.status(201).json({ response: "error_in_company", err: err });
    } else {
      console.log("sent2");
      res.status(201).json({ response: "ok" });
    }
  });
});

app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/", courseRouter);
app.use("/", orderRouter);
app.use("/category", categoryRouter);

// Mongo Connect
const url = "mongodb://localhost:27017/"; //mongo url
const dbName = "testingdb"; // database name

mongoose.connect(
  constandS.MONGOURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Mongo Connected");
  }
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
