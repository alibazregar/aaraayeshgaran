const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const favoriteProduct = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: Schema.Types.ObjectId, ref: "product", required: true },
});
module.exports = mongoose.model("favoriteProduct",favoriteProduct);