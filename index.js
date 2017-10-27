// sudo chown -R _mysql:_mysql /usr/local/var/mysql
// sudo mysql.server start
require('dotenv').config();
const express = require('express');
const Sequelize = require('sequelize');

// app init
const app = express();

// db
const sequelize = new Sequelize('table_crm', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// test connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Opportunities = sequelize.define('opportunities', {
  name: Sequelize.STRING,
  expCloseDate: Sequelize.DATE
});

sequelize
  .sync({ force: true })
  .then(() =>
    Opportunities.create({
      name: 'opp1',
      expCloseDate: new Date()
    })
  )
  .then(opp1 => {
    console.log(
      opp1.get({
        plain: true
      })
    );
  });

// port
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`listening on ${port}`);
