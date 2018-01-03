const db = require('./config');
const lib = require('../lib/helper');
const moment = require('moment');

module.exports.getAllLeads = (req, res) => {
  db.query('SELECT * from leads', (err, rows) => {
    if (err) console.log(err);
    res.json(rows);
  });
};

module.exports.createAndUpdateLeads = (req, res) => {
  let rows;
  if (req.method === 'POST') {
    rows = req.body.newRows;
  } else if (req.method === 'PUT') {
    rows = req.body.updatedRows;
  }

  for (const row of rows) {
    if (row.createdAt)
      row.createdAt = moment(new Date(row.createdAt)).format(
        'YYYY-MM-DD HH:mm:ss'
      );
    const fieldsArr = lib.getFieldsArr(row);
    const fields = lib.getFields(fieldsArr);
    const values = lib.getValues(row, fieldsArr);

    if (req.method === 'POST') {
      db.query(`INSERT INTO leads(${fields}) VALUES (${values});`);
    } else if (req.method === 'PUT') {
      const updateQuery = lib.getUpdateQuery(fieldsArr);
      db.query(
        `INSERT INTO leads(${fields}) VALUES (${
          values
        }) ON DUPLICATE KEY UPDATE ${updateQuery};`
      );
    }
  }

  res.sendStatus(201);
};

module.exports.deleteLeads = (req, res) => {
  const removedIds = req.body.removedIds;
  db.query(
    'DELETE FROM leads WHERE (id) IN (?)',
    [removedIds],
    (err, results) => {
      if (err) return console.log(err);
    }
  );
  res.sendStatus(200);
};

module.exports.getColumnsOfLeads = (req, res) => {
  db.query('SELECT * from leadsColumns ORDER BY id ASC', (err, rows) => {
    if (err) return console.log(err);
    res.json(rows);
  });
};

module.exports.updateColumnOrdersOfLeads = (req, res) => {
  const updatedColumnOrders = req.body.updatedColumnOrders;
  for (const column of updatedColumnOrders) {
    db.query(
      `UPDATE leadsColumns SET rank = ${column.columnOrder} WHERE id = ${
        column.columnId
      }`,
      err => {
        if (err) return console.log(err);
      }
    );
  }
  res.sendStatus(201);
};

module.exports.getLeadById = (req, res) => {
  const id = req.query.id;
  db.query(`SELECT * from leads WHERE id = ${id}`, (err, rows) => {
    if (err) console.log(err);
    res.json(rows);
  });
};

module.exports.updateHiddenColumnsOfLeads = (req, res) => {
  const hiddenColumns = req.body.hiddenColumns;
  db.query('SELECT name, hidden FROM leadsColumns;', (err, columns) => {
    if (!err) {
      for (const column of columns) {
        const name = column.name;
        const hidden = column.hidden;
        if (hidden && !hiddenColumns.includes(name)) {
          db.query(
            `UPDATE leadsColumns SET hidden=false WHERE name='${name}';`
          );
        } else if (!hidden && hiddenColumns.includes(name)) {
          db.query(`UPDATE leadsColumns SET hidden=true WHERE name='${name}';`);
        }
      }
      res.sendStatus(201);
    } else {
      console.log(err);
    }
  });
};
