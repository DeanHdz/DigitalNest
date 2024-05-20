const { Router } = require('express');
const { getReviews, getReview, getReviewsByProductId, createReview, updateReview, deleteReview } = require('../controllers/reviews');
const { validateJWT } = require('../middlewares/verifyJWT');

const router = Router();

router.get("/", getReviews);

router.get("/:id", getReview);

router.get("/:productId", getReviewsByProductId);

router.post("/", [validateJWT], createReview);

router.put("/:id", [validateJWT], updateReview);

router.delete("/:id", [validateJWT], deleteReview);

module.exports = router;