const db = require('./config');

const getAllLeads = (req, res) => {
  db.query('SELECT * from leads', (err, rows, fields) => {
    if (err) console.log(err);
    res.json(rows);
  });
};

const createLeads = (req, res) => {
  let newRows = req.body.newRows;
  for (let row of newRows) {
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
  let existingRows = req.body.existingRows;
  for (let row of existingRows) {
    delete row.createdDate; // placeholder for now;
    let id = row.id;
    db.query(
      `UPDATE leads SET ? WHERE id=${id}`,
      row,
      (err, rows, fields) => {
        if (err) console.log(err);
        console.log('lead is updated');
      }
    );
    res.status(200).send();
  }
};

const deleteLead = (req, res) => {
  console.log(req.body.removedIds);
  let removedIds = req.body.removedIds;
  db.query(
    `DELETE FROM leads WHERE (id) IN (?)`,
    [removedIds],
    function(err, results) {
      if (err) return console.log(err);
      else console.log('sended');
    }
  );
  res.status(200).send();
};

module.exports = {
  getAllLeads: getAllLeads,
  createLeads: createLeads,
  updateLeads: updateLeads,
  deleteLead: deleteLead
};
