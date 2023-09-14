const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require("mongoose-timestamp")
const commentSchema = new Schema({
    user:{type:Schema.Types.ObjectId,ref:"user"},
    product:{type:Schema.Types.ObjectId,ref:"product"},
    title:{type:String,required: true},
    description:{type:String,required: true},
    status:{type:String,required: true,values:["valid","notValid","pending"],default:"pending"},
})
commentSchema.plugin(timestamps)
module.exports = mongoose.model('comment', commentSchema)