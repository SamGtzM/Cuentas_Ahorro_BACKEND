const express = require('express');

const router = express.Router();
const tipotransacctionesController = require('../controllers/tipo_transaccion.controller');

router.get('/', tipotransacctionesController.getTipotransacctiones);

module.exports = router;
