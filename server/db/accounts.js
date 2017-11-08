const db = require('./config');

const getAllAccounts = (req, res) => {
  console.log('GETTING ALL ACCOUNTS');
  db.query('SELECT * from accounts', (err, rows) => {
  	if (!err) { res.json(rows); }
  });
};

module.exports = {
	getAllAccounts
}