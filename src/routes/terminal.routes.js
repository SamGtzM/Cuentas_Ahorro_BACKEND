const express = require('express');

const router = express.Router();
const terminalController = require('../controllers/terminal.controller');

router.get('/', terminalController.getTerminales);

module.exports = router;
