const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const packageSchema = new Schema({
    products:[{type:Schema.Types.ObjectId,ref:"product"}],
    price:{type:Number,required: true},
    discount:{type:Number,min:0,max:100,default:0,required:true},
    photo:{type:String}
})
module.exports = mongoose.model('package',packageSchema)