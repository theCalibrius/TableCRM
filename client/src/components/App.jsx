import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import Nav from './Nav.jsx';
import Leads from '../container/Leads.jsx';
import Opportunities from '../container/Opportunities.jsx';
import Contacts from '../container/Contacts.jsx';
import Accounts from '../container/Accounts.jsx';
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';

class App extends React.Component {
  render() {
    injectGlobal`
      @import url('https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800');

      body {
        font-family: 'Nunito Sans', sans-serif;
        margin: 0;
        background: #fff;
      }
    `;
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
