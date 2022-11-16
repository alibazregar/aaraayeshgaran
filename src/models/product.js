const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
  },
  description: {
    type: String,
    required: true,
  },
  photos: [{ type: String }],
  colorAndNumbers: [
    {
      color: { type: String },
      number: { type: Number },
    },
  ],
});
module.exports = mongoose.model("product", productSchema);
