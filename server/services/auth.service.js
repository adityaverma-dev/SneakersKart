const { User } = require("../models/user")
const httpStatus = require('http-status');
const { apiError } = require("../middleware/apiError")
const userService = require('./user.service');

const createUser = async(email, password) => {
    try {
        if(await User.emailTaken(email)){
throw new apiError(httpStatus.BAD_REQUEST, "User is taken");
        }

        const user = new User({
            email,
            password
        });
        await user.save()
        return user;

    } catch(error){
       throw error;
    }
}

const genAuthToken = (user) => {
const token = user.generateAuthToken();
return token; 
}

const signinemailpass = async(email, password) => {
    try {
        const user = await userService.findEmail(email);
        if(!user) {
        throw new apiError(httpStatus.UNAUTHORIZED, "Incorrect Email");
    }
    const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new apiError(httpStatus.UNAUTHORIZED, "Incorrect password");
        }

    return user;
    } catch(error){
        throw error;
    }
}
module.exports = {
    createUser,
    genAuthToken,
    signinemailpass
}