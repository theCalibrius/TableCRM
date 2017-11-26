import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.div`
	background-color: #2a3756;
`;

const UnorderedList = styled.ul`
	padding: 20px;
	text-align: center;
	margin: 0;
`;

const ListItem = styled.li`
	text-align: center;
	margin: 0;
	list-style: none;
	display: inline-block;
	margin-right: 30px;
	> a {
		font-size: 16px;
		line-height: 21px;
		text-decoration: none;
		color: #ccc;
		transition: 0.2s color ease;
	}
	> a:hover {
		color: #fff;
	}
`;

class Nav extends React.Component {
  render() {
    const activeStyle = {
      color: '#fff',
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
      borderBottomColor: '#fff',
      paddingBottom: '5px'
    };
    return (
      <NavContainer>
        <UnorderedList>
          <ListItem>
            <NavLink activeStyle={activeStyle} to="/dashboard">
							Dashboard
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink activeStyle={activeStyle} to="/leads">
							Leads
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink activeStyle={activeStyle} to="/contacts">
							Contacts
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink activeStyle={activeStyle} to="/accounts">
							Accounts
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink activeStyle={activeStyle} to="/opportunities">
							Opportunities
            </NavLink>
          </ListItem>
        </UnorderedList>
      </NavContainer>
    );
  }
}

export default Nav;
