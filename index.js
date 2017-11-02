require('dotenv').config();
const express = require('express');
const app = express();

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Database
* * * * * * * * * * * * * * * * * * * * * * * * * * */

const db = require('./db/config');

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  CORS
* * * * * * * * * * * * * * * * * * * * * * * * * * */

const cors = require('cors');
app.use(cors());
app.options('*', cors());

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Parser
* * * * * * * * * * * * * * * * * * * * * * * * * * */

const bodyParser = require('body-parser');
app.use(bodyParser.json());

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Router
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/api/leads', (req, res) => {
  db.db.query('SELECT * from leads', (err, rows, fields) => {
    if (err) console.log(err);
    res.json(rows);
  });
});

app.post('/api/leads', (req, res) => {
  let newRows = req.body.newRows;
  for (let row of newRows) {
    row.ownerId = 1; // placeholder for now
    delete row.createdDate; // placeholder for now;
    db.db.query('INSERT INTO leads SET ?', row, (err, rows, fields) => {
      if (err) console.log(err);
      console.log('new lead created');
    });
    res.status(200).send();
  }
});

app.put('/api/leads', (req, res) => {
  let existingRows = req.body.existingRows;
  for (let row of existingRows) {
    delete row.createdDate; // placeholder for now;
    let id = row.id;
    db.db.query(
      `UPDATE leads SET ? WHERE id=${id}`,
      row,
      (err, rows, fields) => {
        if (err) console.log(err);
        console.log('lead is updated');
      }
    );
    res.status(200).send();
  }
});

app.delete('/api/leads', (req, res) => {
  console.log(req.body.removedIds);
  let removedIds = req.body.removedIds;
  db.db.query(
    `DELETE FROM leads WHERE (id) IN (?)`,
    [removedIds],
    function(err, results) {
      if (err) return console.log(err);
      else console.log('sended');
    }
  );
  res.status(200).send();
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Server
* * * * * * * * * * * * * * * * * * * * * * * * * * */

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
