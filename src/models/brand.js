const mongoose = require('mongoose')
const Schema = mongoose.Schema
const brandSchema = new Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    photos:{type:String},
 
})
module.exports = mongoose.model('brand', brandSchema)