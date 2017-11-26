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

injectGlobal`
@import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500,700');

body {
  font-size: 12px;
  font-family: 'Nunito Sans', sans-serif;
  margin: 0;
  background: #fff;
  overflow: hidden;
}
`;

const AppWrap = styled.div`
	background: #ffffff;
	height: 100%;
	overflow: hidden;
`;

class App extends React.Component {
  render() {
    return (
      <AppWrap>
        <Nav />
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/leads" component={Leads} />
          <Route exact path="/contacts" component={Contacts} />
          <Route exact path="/accounts" component={Accounts} />
          <Route exact path="/opportunities" component={Opportunities} />
        </Switch>
      </AppWrap>
    );
  }
}

export default App;
