const mysql = require('mysql');

const db = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'table_crm'
});

db.connect(err => {
  if (err) console.log('Database connection error', err);
  console.log('Database connection success');
});

module.exports = {db: db};
