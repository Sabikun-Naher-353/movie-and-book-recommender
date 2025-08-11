const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/', reviewController.submitReview);
router.get('/:item_type/:item_id', reviewController.getReviewsForItem);

module.exports = router;
