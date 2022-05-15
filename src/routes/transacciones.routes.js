const express = require('express');

const router = express.Router();
const transaccionesController = require('../controllers/transacciones.controller');

router.post('/', transaccionesController.createtransacction);
router.get('/', transaccionesController.gettransacction);
router.delete('/:transaccionId', transaccionesController.deletetransacctionById);

module.exports = router;
