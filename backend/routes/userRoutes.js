const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontrollers.js');

// Route to create a new user
router.post('/users', userController.createUser);

// Route to get all users
router.get('/users', userController.getAllUsers);

module.exports = router;

