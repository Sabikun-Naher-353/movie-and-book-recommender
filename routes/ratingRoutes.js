const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

router.post('/', ratingController.submitRating);

router.get('/top', ratingController.getTopRated);
router.get('/genre/:genre', ratingController.getByGenre);
router.get('/recommend/:user_id', ratingController.recommendItems);
router.get('/trending', ratingController.getTrendingItems);

router.get('/top', (req, res, next) => {
  console.log('GET /top called');
  next();
}, ratingController.getTopRated);

router.get('/:item_type/:item_id', ratingController.getRatingsForItem);

module.exports = router;
