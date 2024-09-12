const { userService, authService, emailService } = require('../services')
const httpStatus = require('http-status');
const { apiError } = require('../middleware/apiError')

const usersController = {
async profile(req,res,next){
    try{
 // we are getting req.user from auth       
        const user = await userService.findUserbyID(req.user._id);
        if(!user){
            throw new apiError(httpStatus.NOT_FOUND, 'User not found')
        }
        res.json(res.locals.permission.filter(user._doc))
    }catch(error){
        next(error)
    }

},
async updateProfile(req,res,next){
    try{
const user = await userService.updateUserProfile(req)
res.json(user);
    }catch(error){
        next(error)
    }

},
async updateEmail(req,res,next){
    try{
const user = await userService.updateUserEmail(req);
const token = await authService.genAuthToken(user);

//send email to verify account

await emailService.registerEmail(user.email, user)

res.cookie('x-access-token', token)
.send({user, token})

    }catch(error){
        next(error)
    }

},
async verifyAccount(req,res,next){
    try{
        const token = await userService.validateToken(req.query.validation);
        const user = await userService.findUserbyID(token.sub);

        if(!user) throw new apiError(httpStatus.NOT_FOUND, 'user not found');
        if(user.verified) throw new apiError(httpStatus.BAD_REQUEST, 'Already verified.')

        user.verified= true;
        user.save();
        res.status(httpStatus.CREATED).send({
            user
        })

    }catch(error){
        next(error);
    }
}
}

module.exports= usersController;