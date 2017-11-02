require('dotenv').config();
const express = require('express');
const app = express();

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
  Database
* * * * * * * * * * * * * * * * * * * * * * * * * * */

const leads = require('./db/leads');

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Router
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/api/leads', leads.getAllLeads);
app.post('/api/leads', leads.createLeads);
app.put('/api/leads', leads.updateLeads);
app.delete('/api/leads', leads.deleteLead);

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Server
* * * * * * * * * * * * * * * * * * * * * * * * * * */

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
