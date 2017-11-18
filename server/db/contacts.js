const db = require('./config');
const lib = require('../lib/helper');

const getAllContacts = (req, res) => {
  db.query('SELECT * from contacts', (err, rows) => {
    if (err) console.log(err);
    res.json(rows);
  });
};

const createAndUpdateContacts = (req, res) => {
  let rows;
  if (req.method === 'POST') {
    rows = req.body.newRows;
  } else if (req.method === 'PUT') {
    rows = req.body.updatedRows;
  }

  for (const row of rows) {
    if (row.createdAt) row.createdAt = moment(new Date(row.createdAt)).format('YYYY-MM-DD HH:mm:ss');
    const fieldsArr = lib.getFieldsArr(row);
    const fields = lib.getFields(fieldsArr);
    const values = lib.getValues(row, fieldsArr);

    if (req.method === 'POST') {
      db.query(`INSERT INTO contacts(${fields}) VALUES (${values});`);
    } else if (req.method === 'PUT') {
      const updateQuery = lib.getUpdateQuery(fieldsArr);
      db.query(`INSERT INTO contacts(${fields}) VALUES (${values}) ON DUPLICATE KEY UPDATE ${updateQuery};`);
    }
  }

  res.sendStatus(201);
};

const deleteContacts = (req, res) => {
  const removedIds = req.body.removedIds;
  db.query(`DELETE FROM contacts WHERE id IN (${removedIds});`, err => {
    if (err) return console.log(err);
    res.sendStatus(200);
  });
};

module.exports = {
  getAllContacts,
  deleteContacts,
  createAndUpdateContacts
};
