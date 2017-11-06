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
    db.query(`INSERT INTO opportunities(${fields}) VALUES (${values});`);
  }

  res.sendStatus(201);
};

const updateOpportunities = (req, res) => {
  let updatedRows = req.body.updatedRows;

  for (let updatedRow of updatedRows) {
    let fields = lib.getFields(updatedRow);
    let values = lib.getValues(updatedRow);
    let updateQuery = lib.getUpdateQuery(updatedRow);
    db.query(`INSERT INTO opportunities(${fields}) VALUES (${values}) ON DUPLICATE KEY UPDATE ${updateQuery};`);
  }

  res.sendStatus(201);
};

module.exports = {
  getAllOpportunities,
  createOpportunities,
  updateOpportunities
};
