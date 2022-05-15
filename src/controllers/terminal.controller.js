const db = require('../connection/database');

// eslint-disable-next-line import/prefer-default-export
export const getTerminales = async (req, res) => {
  await db.query('SELECT * FROM tabla_terminal order by id_terminal;', [req.params.userId], (err, rows, fields) => {
    if (!err) {
      res.status(200).json(rows);
    } else {
      res.status(404).json('Se ha producido un problema al cargar el usuario', fields);
    }
  });
};
