const db = require('./config');
// const lib = require('../lib/helper');

const getTotalOppValuePerStatus = (req, res) => {
  db.query(
    'SELECT status, SUM (estimatedValue) from opportunities group by status',
    (err, values) => {
      if (err) console.log(err);
      const mappedObj = {};
      for (const i of values) {
        mappedObj[i.status] = i['SUM (estimatedValue)'];
      }
      res.json(mappedObj);
    }
  );
};

const getTotalOppValuePerStage = (req, res) => {
  db.query(
    'SELECT stage, SUM (estimatedValue) from opportunities group by stage',
    (err, rows) => {
      if (err) console.log(err);
      res.json(rows);
    }
  );
};

module.exports = {
  getTotalOppValuePerStatus,
  getTotalOppValuePerStage
};
