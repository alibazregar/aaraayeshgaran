const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const completedCartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  packages: [
    {
      package: {
        type: Schema.Types.ObjectId,
        ref: 'Package',
        required: true,
      },
      number: { type: Number, required: true },
    },
  ],
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      number: { type: Number, required: true },
      color: { type: String, required: true },
    },
  ],
  postType : {type: String , values :["pishtaz","tipaks"]},
  postPrice : {type: Number , required:true},
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
  payment : { type :Schema.Types.ObjectId , ref :"payment"}
});

const CompletedCart = mongoose.model('CompletedCart', completedCartSchema);

module.exports = CompletedCart;
