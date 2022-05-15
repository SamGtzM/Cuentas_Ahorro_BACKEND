"use strict";

var express = require('express');

var router = express.Router();

var authController = require('../controllers/auth.controller');

router.get('/', authController.getUsers);
router.post('/singup', authController.singupUser);
router.post('/singin', authController.singinUser);
router.get('/:userId', authController.getUsersById);
router.post('/test', authController.testToken);
module.exports = router;