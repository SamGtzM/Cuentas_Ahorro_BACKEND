"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testToken = exports.singupUser = exports.singinUser = exports.getUsersById = exports.getUsers = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bcryptjs = require('bcryptjs');

var jwt = require('jsonwebtoken');

var db = require('../connection/database');

var config = require('../config');

var getUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return db.query('SELECT * FROM tabla_usuarios INNER JOIN tabla_accesos ON tabla_usuarios.id_acceso = tabla_accesos.id_acceso ORDER BY id_usuario DESC; ', function (err, rows, fields) {
              if (!err) {
                res.status(200).json(rows);
              } else {
                res.status(404).json('Se ha producido un problema al cargar los usuarios', fields);
              }
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUsers = getUsers;

var getUsersById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return db.query('SELECT * FROM tabla_usuarios WHERE id_usuario = ?', [req.params.userId], function (err, rows, fields) {
              if (!err) {
                res.status(200).json(rows);
              } else {
                res.status(404).json('Se ha producido un problema al cargar el usuario', fields);
              }
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getUsersById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUsersById = getUsersById;

var singupUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var pass, passHash;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            pass = req.body.pass;
            _context3.next = 3;
            return bcryptjs.hash(pass, 10);

          case 3:
            passHash = _context3.sent;
            db.query('SELECT * FROM tabla_usuarios WHERE numero_empleado =? OR correo_electronico =? OR telefono =? OR usuario =?', [req.body.numero_empleado, req.body.correo_electronico, req.body.telefono, req.body.usuario], function (err, rows, fields) {
              if (!err) {
                if (rows.length === 0) {
                  db.query('INSERT INTO tabla_usuarios (id_acceso, numero_empleado, nombre_completo, correo_electronico, telefono, usuario, pass, usuario_alta) VALUES (?,?,?,?,?,?,?,?)', [req.body.id_acceso, req.body.numero_empleado, req.body.nombre_completo, req.body.correo_electronico, req.body.telefono, req.body.usuario, passHash, req.body.usuario_alta], function (errInsert, rowsInsert, fieldsInsert) {
                    if (!errInsert) {
                      res.status(200).json(rowsInsert);
                    } else {
                      res.json(errInsert, fieldsInsert);
                    }
                  });
                } else {
                  var num = Number(rows[0].numero_empleado);
                  var num2 = Number(req.body.numero_empleado);

                  if (num === num2) {
                    res.json('Numero de empleado ya registrado');
                  } else if (rows[0].correo_electronico === req.body.correo_electronico) {
                    res.json('Correo ya registrado');
                  } else if (rows[0].telefono === req.body.telefono) {
                    res.json('Telefono ya registrado');
                  } else if (rows[0].usuario === req.body.usuario) {
                    res.json('Usuario ya registrado');
                  }
                }
              } else {
                res.json(err, fields);
              }
            });

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function singupUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.singupUser = singupUser;

var singinUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            db.query('SELECT * FROM tabla_usuarios WHERE usuario = ?', [req.body.usuario], function (err, rows, fields) {
              if (rows.length !== 0) {
                bcryptjs.compare(req.body.pass, rows[0].pass, function (errpass, respass) {
                  if (errpass) {
                    res.json(err, fields);
                  }

                  if (respass) {
                    var data = JSON.stringify(rows[0]);
                    var token = jwt.sign(data, config.llave);
                    res.json({
                      token: token
                    });
                  } else {
                    res.status(401).json('Contraseña incorrecta');
                  }
                });
              } else {
                res.status(401).json('Usuario incorrecto');
              }
            });

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function singinUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.singinUser = singinUser;

var testToken = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var token, content;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (req.headers.authorization) {
              _context5.next = 2;
              break;
            }

            return _context5.abrupt("return", res.status(401).json('No autorizado'));

          case 2:
            token = req.headers.authorization.substr(7);

            if (token !== '') {
              content = jwt.verify(token, config.llave);
              req.data = content;
            } else {
              res.status(401).json('token vacio');
            }

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function testToken(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.testToken = testToken;