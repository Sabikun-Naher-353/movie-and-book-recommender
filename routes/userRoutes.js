const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// ✅ Place specific routes first
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/update', userController.updateUser);



module.exports = router;
