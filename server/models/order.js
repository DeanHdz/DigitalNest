const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: [true, 'Product is required']
            },
            quantity: {
                type: Number,
                required: [true, 'Quantity is required']
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required']
    },
    shippingAddress: {
        type: String,
        required: [true, 'Shipping address is required']
    },
    status: {
        type: String,
        required: [true, 'Status is required']
    }
});

module.exports = mongoose.model('Order', orderSchema);