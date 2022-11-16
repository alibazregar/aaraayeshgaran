const mongoose = require('mongoose')
const Schema = mongoose.Schema
const brandSchema = new Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    photo:{type:String},
 
})
module.exports = mongoose.model('brand', brandSchema)