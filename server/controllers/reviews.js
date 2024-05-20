const { request, response } = require('express'); //Incluimos express para poder usar request y response
const Review = require('../models/review'); //Incluimos el modelo Review para poder hacer operaciones con la base de datos

const getReviews = (req = request, res = response) => {
    Review.find().then(
        (reviews) => {
            res.status(200).json({
                reviews
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error
            });
        }
    );
}

const getReviewsByProductId = (req = request, res = response) => {
    const productId = req.params.productId;
    Review.find({ productId: productId }).then(
        (reviews) => {
            res.status(200).json({
                reviews
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error
            });
        }
    );
}

const getReview = (req = request, res = response) => {
    const id = req.params.id;
    Review.findById(id).then(
        (review) => {
            res.status(200).json({
                review
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error
            });
        }
    );
}

const createReview = (req = request, res = response) => {
    const { userId, productId, rating, comment } = req.body;
    const review = new Review({ userId, productId, rating, comment });
    review.save().then(
        (review) => {
            res.status(201).json({
                msg: "Review created"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                msg: "Review not created: " + error
            });
        }
    );
}

const updateReview = (req = request, res = response) => {
    const id = req.params.id;
    const { userId, productId, rating, comment } = req.body;
    Review.findByIdAndUpdate(id, { userId, productId, rating, comment }).then(
        () => {
            res.status(200).json({
                msg: "Review updated"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                msg: "Review not updated: " + error
            });
        }
    );
}

const deleteReview = (req = request, res = response) => {
    const id = req.params.id;
    Review.findByIdAndDelete(id).then(
        () => {
            res.status(200).json({
                msg: "Review deleted"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                msg: "Review not deleted: " + error
            });
        }
    );
}

module.exports = {
    getReviews,
    getReviewsByProductId,
    getReview,
    createReview,
    updateReview,
    deleteReview
}