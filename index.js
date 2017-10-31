require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
// const Sequelize = require('sequelize');

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
  if (err) throw err;
  console.log('You are now connected...');
});

// const Opportunities = sequelize.define('opportunities', {
//   name: Sequelize.STRING,
//   expCloseDate: Sequelize.DATE
// });

// // dummy data
// sequelize
//   .sync({ force: true })
//   .then(() =>
//     Opportunities.create({
//       name: 'opp1',
//       expCloseDate: new Date()
//     })
//   )
//   .then(() =>
//     Opportunities.create({
//       name: 'opp2',
//       expCloseDate: new Date()
//     })
//   );

// api endpoints
app.get('/api/opportunities', (req, res) => {
  connection.query('SELECT * from opportunities', (err, rows, fields) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.get('/api/leads', (req, res) => {
  connection.query('SELECT * from leads', (err, rows, fields) => {
    if (err) throw err;
    res.json(rows);
  });
});

// port
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`listening on ${port}`);
