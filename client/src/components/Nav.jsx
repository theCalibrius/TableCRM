import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  render() {
    return (
      <div className="nav-container">
        <ul>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/leads">Leads</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/opportunities">Opportunities</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contacts">Contacts</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/accounts">Accounts</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;