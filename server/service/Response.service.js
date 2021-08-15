exports.successResponse = (res,data)=>{
    res.status(200).send({response:"ok",data:data}); 
}

exports.dataNullResponse = (res,err)=>{
    res.status(err.status).send({response:"error",data:null}); 
};

exports.errorResponse = (res,err)=>{
    res.status(err.status).send({response:"error",data:null,errorMessage:err.msg}); 
};
