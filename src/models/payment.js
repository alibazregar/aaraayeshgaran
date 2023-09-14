const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const paymentSchema = new Schema({
  user: {
    type : Schema.Types.ObjectId, ref : "user"
  },
  resNumber: {
    type: String,
    required: true,
  },
  products : [{
    type: Schema.Types.ObjectId,
    ref: "product",
  }],
  packages : [{
    type: Schema.Types.ObjectId,
    ref: "package",
  }],
  status :  {
    type : Boolean ,default : false,
  },
  totalPrice : {
    type : Number, required: true,
  },
  postType : {type: String , values :["pishtaz","tipaks"]},
  postPrice : {type: Number , required:true},
});
paymentSchema.plugin(timestamps);
module.exports = mongoose.model("payment",paymentSchema);
