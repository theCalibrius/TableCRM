const db = require('./config');

const getAllContacts = (req, res) => {
  db.query('SELECT * from contacts', (err, rows) => {
    if (err) console.log(err);
    res.json(rows);
  });
};

// delete contact(s)
const deleteContacts = (req, res) => {
  console.log(req.body.removedIds);
  const removedIds = req.body.removedIds;
  console.log(removedIds);
  db.query(`DELETE FROM contacts WHERE id IN (${removedIds});`, (err, results) => {
    if (err) return console.log(err);
    console.log('sended');
  });
  res.status(200).send();
};

module.exports = {
  getAllContacts,
  deleteContacts
};