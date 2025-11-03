const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const registerController=require('../controllers/registerController');
const logoutController = require('../controllers/logoutController');

router.post('/register', registerController.handleRegister);
router.post('/login', authController.handleLogin);
router.post('/logout', logoutController.handleLogout);

module.exports = router;