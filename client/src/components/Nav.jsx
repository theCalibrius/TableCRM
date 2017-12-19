import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.div`
	background-color: #2a3756;
`;

const UnorderedList = styled.ul`
	padding: 20px;
	text-align: left;
	margin: 0;
`;

const ListItem = styled.li`
	text-align: center;
	margin: 0;
	list-style: none;
	display: inline-block;
	margin-right: 30px;
	> a {
		font-size: 14px;
		line-height: 21px;
		text-decoration: none;
		color: #ccc;
		transition: 0.2s color ease;
		display: flex;
		align-items: center;
		> p {
			margin: 0 0 0 6px;
		}
	}
	> a:hover {
		color: #fff;
	}
`;

class Nav extends React.Component {
  render() {
    const activeStyle = {
      color: '#fff',
      fontWeight: '500'
    };
    return (
      <NavContainer>
        <UnorderedList>
          <ListItem>
            <NavLink activeStyle={activeStyle} to="/dashboard">
              <i className="material-icons">poll</i>
              <p>Dashboard</p>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink activeStyle={activeStyle} to="/leads/test">
              <i className="material-icons">navigation</i>
              <p>Leads</p>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink activeStyle={activeStyle} to="/contacts">
              <i className="material-icons">people</i>
              <p>Contacts</p>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink activeStyle={activeStyle} to="/accounts">
              <i className="material-icons">domain</i>
              <p>Accounts</p>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink activeStyle={activeStyle} to="/opportunities">
              <i className="material-icons">local_atm</i>
              <p>Opportunities</p>
            </NavLink>
          </ListItem>
        </UnorderedList>
      </NavContainer>
    );
  }
}

export default Nav;
