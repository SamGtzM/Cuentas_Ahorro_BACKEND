const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/singup', authController.singupUser);
router.post('/singin', authController.singinUser);
router.post('/test', authController.testToken);

module.exports = router;
