const mongoose = require('mongoose');
const httpStatus = require('http-status');

class apiError extends Error {
     constructor(statuscode, message){
        super(); 
        this.statuscode= statuscode;
        this.message= message;

     }
}

const handleError= (err, res) => {

const statuscode = err.statuscode;
const message = err.message;
    res.status(statuscode).json({
        status: 'error',
        statuscode,
        message
    })
}

const ConverttoapiError = (err, req, res, next) => {
    let error = err;
if(!(error instanceof  apiError)) {
const statuscode = error.statuscode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
const message = error.message || httpStatus[statuscode];

error = new apiError(statuscode, message)
}
next(error)
}

module.exports = {
    apiError,
    handleError,
    ConverttoapiError
}