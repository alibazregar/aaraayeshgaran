const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentSchema = new Schema({
    user:{type:Schema.Types.ObjectId,ref:"user"},
    product:{type:Schema.Types.ObjectId,ref:"product"},
    title:{type:String,required: true},
    message:{type:String,required: true},
    media:[{type:String}]
})
module.exports = mongoose.model('comment', commentSchema)