const { Router } = require('express');
const { getReviews, getReview, getReviewsByProductId, createReview, updateReview, deleteReview } = require('../controllers/reviews');

const router = Router();

router.get("/", getReviews);

router.get("/:id", getReview);

router.get("/:productId", getReviewsByProductId);

router.post("/", createReview);

router.put("/:id", updateReview);

router.delete("/:id", deleteReview);

module.exports = router;