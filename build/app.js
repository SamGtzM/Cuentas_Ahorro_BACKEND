"use strict";

var express = require('express');

var morgan = require('morgan');

var app = express();

var bodyParser = require('body-parser');

var cors = require('cors');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev')); // ROUTES

var authRoute = require('./routes/auth.routes');

app.use('/auth', authRoute);
module.exports = app;