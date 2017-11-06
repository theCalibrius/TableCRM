const db = require('./config');
const lib = require('../lib/helper');

const getAllOpportunities = (req, res) => {
  db.query('SELECT * from opportunities', (err, rows) => {
    if (!err) { res.json(rows); }
  });
};

const createOpportunities = (req, res) => {
  let newRows = req.body.newRows;

  for (let newRow of newRows) {
    let fields = lib.getFields(newRow);
    let values = lib.getValues(newRow);
    db.query(`INSERT INTO opportunities (${fields}) VALUES (${values});`);
  }

  res.sendStatus(201);
};

const updateOpportunities = (req, res) => {
  const updatedRows = req.body.updatedRows;

  for (let row of updatedRows) {
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
