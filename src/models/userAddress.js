const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userAddressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverName: {
    type: String,
    required: true,
  },
  receiverPhone: { type: Number, required: true },
  state:{type: String, required: true},
  city: { type: String, required: true },
  address: { type: String, required: true },
  postCode: { type: Number, required: true },
});
module.exports = mongoose.model("userAddress", userAddressSchema);
