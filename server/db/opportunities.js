const db = require('./config');

const getAllOpportunities = (req, res) => {
  db.query('SELECT * from opportunities', (err, rows) => {
    if (!err) { res.json(rows); }
  });
};

module.exports = {
  getAllOpportunities: getAllOpportunities
};
