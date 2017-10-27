import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard.jsx';
import Leads from './Leads/Leads.jsx';
import Opportunities from './Opportunities/Opportunities.jsx';
import People from './People/People.jsx';
import Companies from './Companies/Companies.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <div>Header</div>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/people" component={People} />
          <Route exact path="/companies" component={Companies} />
        </Switch>
      </div>
    );
  }
}

export default App;
