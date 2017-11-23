import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import Nav from './Nav.jsx';
import Leads from '../container/Leads.jsx';
import Opportunities from '../container/Opportunities.jsx';
import Contacts from '../container/Contacts.jsx';
import Accounts from '../container/Accounts.jsx';
import People from './People.jsx';
import Companies from './Companies.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/leads" component={Leads} />
          <Route exact path="/opportunities" component={Opportunities} />
          <Route exact path="/contacts" component={Contacts} />
          <Route exact path="/accounts" component={Accounts} />
        </Switch>
      </div>
    );
  }
}

export default App;
