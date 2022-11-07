const mongoose = require('mongoose');
const codeSchema = new mongoose.Schema({
    code:{type:String,required:true},
    phone:{type:Number,required:true},
    createdAt:{type:Date,default:Date.now,expires:240}
})
module.exports = mongoose.model('Code', codeSchema)