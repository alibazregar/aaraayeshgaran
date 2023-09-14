const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    password:{type: String, required: true},
    phone:{type:Number, required: true},
    email:{type:String, required: true},
    isVerified:{type:Boolean, required: true,default: false},
    verificationCode:{type:Number},
    nationalNumber:{type:Number},
    birthDate:{type:Date},
    isAdmin:{type:Boolean, default:false}
})

module.exports = mongoose.model('User',userSchema)