const db = require('../connection/database');

export const createCuentaAhorro = async (req, res) => {
  await db.query(
    'INSERT INTO tabla_cuenta_ahorro (estado, numero_cuenta, saldo) VALUES (?, ?, ?)',
    [req.body.estado,
      req.body.numero_cuenta,
      req.body.saldo],
    (err, rows, fields) => {
      if (!err) {
        res.status(200).json(rows);
      } else {
        console.log(err, fields);
      }
    },
  );
};

export const getCuentaAhorro = async (req, res) => {
  await db.query('SELECT * FROM tabla_cuenta_ahorro ORDER BY id_cuenta DESC', (err, rows, fields) => {
    if (!err) {
      res.status(200).json(rows);
    } else {
      console.log(err, fields);
    }
  });
};

export const getCuentasAhorroById = async (req, res) => {
  await db.query('SELECT * FROM tabla_cuenta_ahorro WHERE id_cuenta = ?', [req.params.cuentaId], (err, rows, fields) => {
    if (!err) {
      res.status(200).json(rows);
    } else {
      console.log(err, fields);
    }
  });
};

export const updateCuentasAhorroById = async (req, res) => {
  await db.query(
    'UPDATE tabla_cuenta_ahorro SET estado = ?, numero_cuenta = ?, saldo = ? WHERE id_cuenta = ?',
    [req.body.estado,
      req.body.numero_cuenta,
      req.body.saldo,
      req.params.cuentaId],

    (err, rows, fields) => {
      if (!err) {
        res.status(200).json(rows);
      } else {
        console.log(err, fields);
      }
    },
  );
};

export const deleteCuentasAhorroById = async (req, res) => {
  await db.query('DELETE FROM tabla_cuenta_ahorro WHERE id_cuenta = ?', [req.params.cuentaId], (err, rows, fields) => {
    if (!err) {
      res.status(204).json(rows);
    } else {
      console.log(err, fields);
    }
  });
};
