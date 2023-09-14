const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamps = require("mongoose-timestamp")
const productSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "category",
  },
  brand: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "brand",
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
    default : 0,
    max: 100,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  photos: [{ type: String }],
  colorAndNumbers: [
    {
      color: { type: String },
      rgbColor : {type : String},
      number: { type: Number },
    },
  ],
  extraAttributes: Schema.Types.Mixed,
  englishTitle: { type : String },
  specification: { type : String },
  details: { type : String },
  country : { type : String },
});
productSchema.plugin(timestamps)
module.exports = mongoose.model("product", productSchema);
