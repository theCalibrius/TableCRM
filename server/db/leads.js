const db = require('./config');

const getAllLeads = (req, res) => {
  db.query('SELECT * from leads', (err, rows) => {
    if (err) console.log(err);
    res.json(rows);
  });
};

const createLeads = (req, res) => {
  const newRows = req.body.newRows;
  for (const row of newRows) {
    row.ownerId = 1; // placeholder for now
    delete row.createdDate; // placeholder for now;
    db.query('INSERT INTO leads SET ?', row, (err, rows, fields) => {
      if (err) console.log(err);
      console.log('new lead created');
    });
    res.status(200).send();
  }
};

const updateLeads = (req, res) => {
  const existingRows = req.body.existingRows;
  for (const row of existingRows) {
    delete row.createdDate; // placeholder for now;
    const id = row.id;
    db.query(`UPDATE leads SET ? WHERE id=${id}`, row, (err, rows, fields) => {
      if (err) console.log(err);
      console.log('lead is updated');
    });
    res.status(200).send();
  }
};

const deleteLead = (req, res) => {
  console.log(req.body.removedIds);
  const removedIds = req.body.removedIds;
  db.query('DELETE FROM leads WHERE (id) IN (?)', [removedIds], (err, results) => {
    if (err) return console.log(err);
    console.log('sended');
  });
  res.status(200).send();
};

module.exports = {
  getAllLeads,
  createLeads,
  updateLeads,
  deleteLead
};
