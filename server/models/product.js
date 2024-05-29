const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    img: {
        type: File,
        required: [false]
    },
    stockQuantity: {
        type: Number,
        required: [true, 'Stock is required']
    }
});

module.exports = mongoose.model('Product', productSchema);