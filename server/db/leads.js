const db = require('./config');
const lib = require('../lib/helper');
const moment = require('moment');

const getAllLeads = (req, res) => {
  db.query('SELECT * from leads', (err, rows) => {
    if (err) console.log(err);
    res.json(rows);
  });
};

const createAndUpdateLeads = (req, res) => {
  let rows;
  if (req.method === 'POST') {
    rows = req.body.newRows;
  } else if (req.method === 'PUT') {
    rows = req.body.updatedRows;
  }

  for (const row of rows) {
    if (row.createdDate) row.createdDate = moment(row.createdDate).format('YYYY-MM-DD HH:mm:ss');
    const fieldsArr = lib.getFieldsArr(row);
    const fields = lib.getFields(fieldsArr);
    const values = lib.getValues(row, fieldsArr);

    if (req.method === 'POST') {
      db.query(`INSERT INTO leads(${fields}) VALUES (${values});`);
    } else if (req.method === 'PUT') {
      const updateQuery = lib.getUpdateQuery(row);
      db.query(`INSERT INTO leads(${fields}) VALUES (${values}) ON DUPLICATE KEY UPDATE ${updateQuery};`);
    }
  }

  res.sendStatus(201);
};

const deleteLeads = (req, res) => {
  const removedIds = req.body.removedIds;
  db.query('DELETE FROM leads WHERE (id) IN (?)', [removedIds], (err, results) => {
    if (err) return console.log(err);
  });
  res.status(200).send();
};

module.exports = {
  getAllLeads,
  createAndUpdateLeads,
  deleteLeads
};
