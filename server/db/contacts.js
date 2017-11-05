const db = require('./config');

const getAllContacts = (req, res) => {
  db.query('SELECT * from contacts', (err, rows) => {
    if (err) console.log(err);
    res.json(rows);
  });
};

module.exports = {
  getAllContacts
};
