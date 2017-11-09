const db = require('./config');

const getAllContacts = (req, res) => {
  db.query('SELECT * from contacts', (err, rows) => {
    if (err) console.log(err);
    res.json(rows);
  });
};

// delete contact(s)
const deleteContacts = (req, res) => {
  const removedIds = req.body.removedIds;
  console.log(removedIds);
  db.query(`DELETE FROM contacts WHERE id IN (${removedIds});`, err => {
    if (err) return console.log(err);
    res.sendStatus(200);
  });
};

module.exports = {
  getAllContacts,
  deleteContacts
};
