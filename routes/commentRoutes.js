const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.submitComment);
router.get('/:item_type/:item_id', commentController.getCommentsForItem);

module.exports = router;
