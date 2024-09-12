const { User } = require("../models/user")
const httpStatus = require('http-status')
const { apiError} = require('../middleware/apiError')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const validateToken = async(token)=>{
    return jwt.verify(token, process.env.DB_SEC);
}

const findEmail = async(email) => {
return User.findOne({email})
}
const findUserbyID = async(_id) => {
return await User.findById(_id)
}
const updateUserProfile = async(req) => {
try{
const user = await User.findOneAndUpdate(
    {_id: req.user._id},
    {
        "$set":{
            ...req.body.data // we can validate what we want to patch as well
        }
    },
    {
        new: true // just a setting that gives the old resources ( not important can remove it too)
    }
);
if(!user){
    throw new apiError(httpStatus.NOT_FOUND, 'user not found');
}
return user;
}catch(error){
    throw error;
}
}
const updateUserEmail = async(req) => {
try{
    if(await User.emailTaken(req.body.newemail)){
        throw new apiError(httpStatus.BAD_REQUEST, 'Email is already Taken, try another')
 }
 const user = await User.findOneAndUpdate(
    {_id: req.user._id, email:req.user.email},
    {
        "$set":{
           email: req.body.newemail,
           verified:false
        }
    },
    {
        new: true // just a setting that gives the old resources ( not important can remove it too)
    }
);
if(!user){
    throw new apiError(httpStatus.NOT_FOUND, 'user not found');
}
return user

}catch(error){
    throw error;
}
}

module.exports = {
    findEmail,
    findUserbyID,
    updateUserProfile,
    updateUserEmail,
    validateToken
}