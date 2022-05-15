const express = require('express');
const morgan = require('morgan');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// ROUTES
const authRoute = require('./routes/auth.routes');
const terminalRoute = require('./routes/terminal.routes');
const tipotransacctionesRoute = require('./routes/tipo_transacciones.routes');
const cuentaAhorroRoute = require('./routes/cuenta_ahorro.routes');
const transaccionesRoute = require('./routes/transacciones.routes');

app.use('/auth', authRoute);
app.use('/terminal', terminalRoute);
app.use('/tipo_transacctiones', tipotransacctionesRoute);
app.use('/cuenta_ahorro', cuentaAhorroRoute);
app.use('/transacctiones', transaccionesRoute);

module.exports = app;
