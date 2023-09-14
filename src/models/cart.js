const mongoose = require('mongoose');
const Schema = mongoose.Schema
const cartSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,ref:"User",unique:true,
    },
    products :[{
        id:{type:Schema.Types.ObjectId,ref:"product"},
        number:{type:Number, required: true},
        color:{type:String, required: true}
    }
    ],
    packages :[{
        id:{type:Schema.Types.ObjectId,ref:"package"},
        number:{type:Number, required: true},
    }]
})
cartSchema.virtual('totalPrice').get(function () {
    let totalPrice = 0;

    for (const product of this.products) {
        const productPrice = product.id.price;
        const productDiscount = product.id.discount || 0;
        const discountedPrice = productPrice * (1 - productDiscount / 100);
        totalPrice += discountedPrice * product.number;
    }

    for (const pkg of this.packages) {
        const packagePrice = pkg.id.price;
        const packageDiscount = pkg.id.discount || 0;
        const discountedPrice = packagePrice * (1 - packageDiscount / 100);
        totalPrice += discountedPrice * pkg.number;
    }
    return totalPrice;
});
module.exports = mongoose.model('cart', cartSchema)