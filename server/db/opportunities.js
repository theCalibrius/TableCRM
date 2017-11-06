const db = require('./config');

const getAllOpportunities = (req, res) => {
  db.query('SELECT * from opportunities', (err, rows) => {
    if (!err) { res.json(rows); }
  });
};

const createOpportunities = (req, res) => {
  const newRows = req.body.newRows;

  for (let row of newRows) {
    db.query('INSERT INTO opportunities SET ?', row, (err, rows) => {
      if (!err) { res.sendStatus(201); }
    });
  }
};

const updateOpportunities = (req, res) => {
  const updatedRows = req.body.updatedRows;

  for (let row of updatedRows) {
    delete row.createdDate;
    const id = row.id;
    db.query(`UPDATE opportunities SET ? WHERE id=${id}`, row, (err, rows) => {
      if (!err) { res.sendStatus(201); }
    });
  }
};

module.exports = {
  getAllOpportunities,
  createOpportunities,
  updateOpportunities
};
