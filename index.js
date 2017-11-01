require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
// app init
const app = express();

// db
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'table_crm'
});

connection.connect(err => {
  if (err) console.log(err);
  console.log('You are now connected...');
});

// allow cross domain request
app.use(cors());
app.options('*', cors());

// use body parser to use req.body
app.use(bodyParser.json());

app.get('/api/leads', (req, res) => {
  connection.query('SELECT * from leads', (err, rows, fields) => {
    if (err) console.log(err);
    res.json(rows);
  });
});

app.post('/api/leads', (req, res) => {
  let newRows = req.body.newRows;
  for (let row of newRows) {
    row.ownerId = 1; // placeholder for now
    delete row.createdDate; // placeholder for now;
    connection.query('INSERT INTO leads SET ?', row, (err, rows, fields) => {
      if (err) console.log(err);
      console.log('new lead created');
    });
  }
});

app.put('/api/leads', (req, res) => {
  let existingRows = req.body.existingRows;
  for (let row of existingRows) {
    delete row.createdDate; // placeholder for now;
    let id = row.id;
    connection.query(
      `UPDATE leads SET ? WHERE id=${id}`,
      row,
      (err, rows, fields) => {
        if (err) console.log(err);
        console.log('lead is updated');
      }
    );
  }
});

app.delete('/api/leads', (req, res) => {
  console.log(req.body.removedIds);
  let removedIds = req.body.removedIds;
  connection.query(
    `DELETE FROM leads WHERE (id) IN (?)`,
    [removedIds],
    function(err, results) {
      if (err) return console.log(err);
      else console.log('sended');
    }
  );
});

// port
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`listening on ${port}`);
