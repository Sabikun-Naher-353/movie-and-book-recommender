const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/movies', itemController.getMovies);
router.get('/books', itemController.getBooks);

router.post('/movies', itemController.addMovie);
router.post('/books', itemController.addBook);

router.delete('/movies/:id', itemController.deleteMovie);
router.delete('/books/:id', itemController.deleteBook);



module.exports = router;
