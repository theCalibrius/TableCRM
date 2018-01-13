import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import Nav from './Nav.jsx';
import RightPanel from './RightPanel.jsx';
import Leads from '../containers/Leads.jsx';
import Opportunities from '../containers/Opportunities.jsx';
import Contacts from '../containers/Contacts.jsx';
import Accounts from '../containers/Accounts.jsx';

import styled from 'styled-components';
import { injectGlobal } from 'styled-components';

injectGlobal`
@import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500,700');

body {
  font-size: 12px;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 400;
  margin: 0;
  background: #fff;
  overflow: hidden;
  color: #363636;
}

html { box-sizing: border-box; font-size: 10px; }
*, *:before, *:after { box-sizing: inherit; }
body, ul, li  { margin: 0; padding: 0; }
li { list-style: none; }
p, h1, h2, h3, h4, h5, h6 { margin-top: 0; }
a { text-decoration: none; }
input { border-style: none; background: transparent; outline: none; }
button { padding: 0; background: none; border: none; outline: none; }

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 20px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;
  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;
  /* Support for IE. */
  font-feature-settings: 'liga';
}
.detail_button{
  position: absolute;
  left: 16px;
  font-size: 14px;
  z-index: 1000;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.24);
  border-radius: 50%;
  padding: 4px;
  transition: 0.2s all ease;
  > *:hover {
		background-color: #ededed;
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
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/leads" component={Leads} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/accounts" component={Accounts} />
        <Route path="/opportunities" component={Opportunities} />
      </AppWrap>
    );
  }
}

export default App;
