const jwt = require("jsonwebtoken");

exports.encrptyToken = (data,callback)=>{
    jwt.sign(data,"",(err,data)=>{
        callback(data);
    });
}


exports.decryptToken = (data,callback)=>{
    jwt.verify(data,"",(err,data)=>{
        callback(data);
    });
}