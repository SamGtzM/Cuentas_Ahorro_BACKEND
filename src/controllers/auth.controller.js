const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../connection/database');
const config = require('../config');

export const singupUser = async (req, res) => {
  const { pass } = req.body;
  const passHash = await bcryptjs.hash(pass, 10);
  db.query(
    'SELECT * FROM tabla_usuarios WHERE email =?',
    [req.body.email],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length === 0) {
          db.query(
            'INSERT INTO tabla_usuarios (email, nombre_completo, pass) VALUES (?,?,?)',
            [req.body.email,
              req.body.nombre_completo,
              passHash],
            (errInsert, rowsInsert, fieldsInsert) => {
              if (!errInsert) {
                res.status(200).json(rowsInsert);
              } else {
                res.json(errInsert, fieldsInsert);
              }
            },
          );
        } else {
          const email = Number(rows[0].email);
          const email2 = Number(req.body.email);
          if (email === email2) {
            res.json('El usuario ya existe');
          }
        }
      } else {
        res.json(err, fields);
      }
    },
  );
};

export const singinUser = async (req, res) => {
  db.query('SELECT * FROM tabla_usuarios WHERE email = ?', [req.body.email], (err, rows, fields) => {
    if (rows.length !== 0) {
      bcryptjs.compare(req.body.pass, rows[0].pass, (errpass, respass) => {
        if (errpass) {
          res.json(err, fields);
        }
        if (respass) {
          const data = JSON.stringify(rows[0]);
          const token = jwt.sign(data, config.llave);
          res.json({ token });
        } else {
          res.status(401).json('Contraseña incorrecta');
        }
      });
    } else {
      res.status(401).json('Usuario incorrecto');
    }
  });
};

export const testToken = async (req, res) => {
  if (!req.headers.authorization) return res.status(401).json('No autorizado');
  const token = req.headers.authorization.substr(7);
  if (token !== '') {
    const content = jwt.verify(token, config.llave);
    req.data = content;
  } else {
    res.status(401).json('token vacio');
  }
};
