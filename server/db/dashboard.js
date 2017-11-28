const db = require('./config');
// const lib = require('../lib/helper');

const getTotalOppValuePerStatus = (req, res) => {
  db.query(
    'SELECT status, SUM (estimatedValue) from opportunities group by status',
    (err, rows) => {
      if (err) console.log(err);
      res.json(rows);
    }
  );
};

module.exports = {
  getTotalOppValuePerStatus
};
