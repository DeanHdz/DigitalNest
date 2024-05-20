const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required']
    },
    review: {
        type: String,
        required: [true, 'Review is required']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required']
    }
});

module.exports = mongoose.model('Review', reviewSchema);