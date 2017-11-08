const db = require('./config');
const lib = require('../lib/helper');

module.exports.getAllOpportunities = (req, res) => {
  db.query('SELECT * from opportunities', (err, rows) => {
    if (!err) { res.json(rows); }
  });
};

module.exports.createAndUpdateOpportunities = (req, res) => {
  let rows;
  if (req.method === 'POST') {
    rows = req.body.newRows;
  } else if (req.method === 'PUT') {
    rows = req.body.updatedRows;
  }

  for (let row of rows) {
    let fieldsArr = lib.getFieldsArr(row);
    let fields = lib.getFields(fieldsArr);
    let values = lib.getValues(row, fieldsArr);

    if (req.method === 'POST') {
      db.query(`INSERT INTO opportunities(${fields}) VALUES (${values});`);

    } else if (req.method === 'PUT') {
      let updateQuery = lib.getUpdateQuery(row);
      db.query(`INSERT INTO opportunities(${fields}) VALUES (${values}) ON DUPLICATE KEY UPDATE ${updateQuery};`);
    }
  }

  res.sendStatus(201);
};
