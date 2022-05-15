const db = require('../connection/database');

export const createtransacction = async (req, res) => {
  await db.query('SELECT * from tabla_cuenta_ahorro where id_cuenta  = ?', [req.body.id_cuenta], (err, rows) => {
    if (rows.length !== 0) {
      if (req.body.id_tipo_transacction === '1') {
        const calculo1 = (parseInt(rows[0].saldo) + parseInt(req.body.saldo));
        db.query('UPDATE tabla_cuenta_ahorro SET saldo = ? WHERE id_cuenta = ?', [calculo1, req.body.id_cuenta], (err2, rows2, fields2) => {
          if (!err2) {
            db.query(
              'INSERT INTO tabla_transacciones (id_tipo_transacction, id_cuenta, id_terminal, id_usuario) VALUES (?, ?, ?, ?)',
              [req.body.id_tipo_transacction,
                req.body.id_cuenta,
                req.body.id_terminal,
                req.body.id_usuario],
              (err4, rows4, fields4) => {
                if (!err4) {
                  res.status(200).json(rows4);
                } else {
                  console.log(err4, fields4);
                }
              },
            );
          } else {
            res.status(404).json('Se ha producido un problema al ingresar los datos', err, fields4);
          }
        });
      } else if (req.body.id_tipo_transacction === '2') {
        const calculo2 = (parseInt(rows[0].saldo) - parseInt(req.body.saldo));
        db.query('UPDATE tabla_cuenta_ahorro SET saldo = ? WHERE id_cuenta = ?', [calculo2, req.body.id_cuenta], (err3, rows3, fields3) => {
          if (!err3) {
            db.query(
              'INSERT INTO tabla_transacciones (id_tipo_transacction, id_cuenta, id_terminal, id_usuario) VALUES (?, ?, ?, ?)',
              [req.body.id_tipo_transacction,
                req.body.id_cuenta,
                req.body.id_terminal,
                req.body.id_usuario],
              (err5, rows5, fields5) => {
                if (!err5) {
                  res.status(200).json(rows5);
                } else {
                  console.log(err3, fields5);
                }
              },
            );
          } else {
            res.status(404).json('Se ha producido un problema al ingresar los datos', err, fields5);
          }
        });
      }
    }
  });
};

export const gettransacction = async (req, res) => {
  await db.query('SELECT * FROM tabla_transacciones INNER JOIN tabla_tipo_transacciones ON tabla_transacciones.id_tipo_transacction = tabla_tipo_transacciones.id_tipo_transacction   INNER JOIN tabla_cuenta_ahorro ON tabla_transacciones.id_cuenta = tabla_cuenta_ahorro.id_cuenta   INNER JOIN  tabla_terminal ON tabla_transacciones.id_terminal = tabla_terminal.id_terminal   INNER JOIN tabla_usuarios ON tabla_transacciones.id_usuario = tabla_usuarios.id_usuario WHERE tabla_cuenta_ahorro.estado = "Activo" ORDER BY id_transacction DESC; ', (err, rows, fields) => {
    if (!err) {
      res.status(200).json(rows);
    } else {
      console.log(err, fields);
    }
  });
};

export const deletetransacctionById = async (req, res) => {
  await db.query('DELETE FROM tabla_transacciones WHERE id_transacction = ?', [req.params.transacctionId], (err, rows, fields) => {
    if (!err) {
      res.status(204).json(rows);
    } else {
      console.log(err, fields);
    }
  });
};
