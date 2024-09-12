const { User } = require('../models/user');
require('dotenv').config();

const { Strategy: jwtStrategy, ExtractJwt } = require('passport-jwt');


const jwtOptions = {
    secretOrKey: process.env.DB_SEC,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()

};

const jwtVerify = async(payload, done) => {
    try{
        const user = await User.findById(payload.sub);
        if(!user){
            return done(null, false)
        }
        done(null, user)
        
    }catch(error){
        done(error, false)

    }
}

const jwtAuthStrategy = new jwtStrategy(jwtOptions, jwtVerify)

module.exports = {
    jwtAuthStrategy
}