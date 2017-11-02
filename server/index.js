require('dotenv').config();
const express = require('express');
/* * * CORS * * */
const cors = require('cors');
/* * * Parser * * */
const bodyParser = require('body-parser');
/* * * Database * * */
const leads = require('./db/leads');

const app = express();

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Middleware
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

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
