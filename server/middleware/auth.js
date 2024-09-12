const passport = require('passport');
const { apiError } = require('./apiError');
const httpStatus = require('http-status');
const { roles } = require('../config/roles');

const verify = (req, res, resolve, reject, rights) => async(err,user) => {
if(err || !user){
  return reject(new apiError(httpStatus.UNAUTHORIZED, 'Sorry, unauthorized'))
}
req.user = user;

if(rights.length){
    const action = rights[0]//create or read, simply CRUD functionality
    const resource= rights[1]// path like profile
    console.log(`Checking permission for action: ${action}, resource: ${resource}`);
    console.log(`User role: ${req.user.role}`);

    const permission = roles.can(req.user.role)[action](resource);
    console.log(`Permission granted: ${permission.granted}`);
    if(!permission.granted){
        return reject(new apiError(httpStatus.FORBIDDEN, 'Sorry, no rights to you'))
    }
    res.locals.permission = permission;
}

resolve()

}


const auth = (...rights) => async(req, res, next) =>{
return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verify(req, res, resolve, reject, rights))(req, res, next);


})
.then(() => next())
.catch((err) => next(err))
}


module.exports = auth;