const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/signup',AuthController.signup);
router.post('/login',AuthController.login);
router.post('/token', AuthController.token);
router.post('/login/facebook', AuthController.facebook);
router.post('/login/google', AuthController.google);
router.get('/verify/:id', AuthController.verify);

module.exports = router;
