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

module.exports = {
  getAllOpportunities,
  createOpportunities
};
