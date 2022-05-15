"use strict";

var mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ironmaiden12',
  database: 'ahorro'
});
mysqlConnection.connect(function (err) {
  if (err) {
    console.log('Error en db: ', err);
  } else {
    console.log('DB ok');
  }
});
module.exports = mysqlConnection;