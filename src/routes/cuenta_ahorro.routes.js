const express = require('express');

const router = express.Router();
const CuentasAhorroController = require('../controllers/cuenta_ahorro.controller');

router.post('/', CuentasAhorroController.createCuentaAhorro);
router.get('/', CuentasAhorroController.getCuentaAhorro);
router.get('/:cuentaId', CuentasAhorroController.getCuentasAhorroById);
router.put('/:cuentaId', CuentasAhorroController.updateCuentasAhorroById);
router.delete('/:cuentaId', CuentasAhorroController.deleteCuentasAhorroById);

module.exports = router;
