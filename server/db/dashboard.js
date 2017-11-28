const db = require('./config');
const lib = require('../lib/helper');
const moment = require('moment');

const getTotalOppValuePerStatus = (req, res) => {
  db.query('SELECT * from opportunities', (err, rows) => {
    if (err) console.log(err);
    res.json(rows);
  });
};

module.exports = {
  getTotalOppValuePerStatus
};
