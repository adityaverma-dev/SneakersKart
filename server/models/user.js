const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
require('dotenv').config();

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('Invalid Email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum:['user', 'admin'],
        default: 'user'
    },
    firstname:{
        type: String,
        maxLength: 100,
        trim: true,
        default: ''
    },
    lastname:{
        type: String,
        maxLength: 100,
        trim: true,
        default: ''
    },
    cart:{
        type:Array,
        default:[]
    },
    history:{
        type: Array,
        default: []
    },
    verified:{
        type: Boolean,
        default: false

    }
});
//when we will be saving the user, before saving the pre will kick-in and this function will execute
userSchema.pre('save', async function(next){

let user = this

if(user.isModified('password')){
    const salt = await bcrypt.genSalt(10); 
const hash = await bcrypt.hash(user.password, salt);

user.password= hash;
}


//next here will resume the save
next()

});

userSchema.methods.generateAuthToken = function(){
    let user = this;
    const userObj = { sub: user._id.toHexString(), email:user.email };
    const token = jwt.sign(userObj, process.env.DB_SEC, {expiresIn: '1d'});
    return token; 
}

userSchema.methods.generateRegisterToken = function (){
    let user = this;
    const userObj = {sub: user._id.toHexString()};
    const token = jwt.sign(userObj, process.env.DB_SEC, {expiresIn: '1h'})
    return token; 
}

 
//statics is used to add built-in function to whole schema
userSchema.statics.emailTaken = async function(email)
{
    const user = await this.findOne({email})
    return !!user;
}

userSchema.methods.comparePassword = async function(checkpassword){
    const user = this;
    const match = await bcrypt.compare(checkpassword, user.password);
    return match; 
}
const User=mongoose.model('User', userSchema);
module.exports = { User };