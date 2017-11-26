import React from 'react';
import { Link } from 'react-router-dom';
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
		color: #fff;
	}
	> a:hover {
		border-bottom: 2px solid #fff;
		padding-bottom: 5px;
	}
`;

class Nav extends React.Component {
  render() {
    return (
      <NavContainer>
        <UnorderedList>
          <ListItem>
            <Link to="/dashboard">Dashboard</Link>
          </ListItem>
          <ListItem>
            <Link to="/leads">Leads</Link>
          </ListItem>
          <ListItem>
            <Link to="/contacts">Contacts</Link>
          </ListItem>
          <ListItem>
            <Link to="/accounts">Accounts</Link>
          </ListItem>
          <ListItem>
            <Link to="/opportunities">Opportunities</Link>
          </ListItem>
        </UnorderedList>
      </NavContainer>
    );
  }
}

export default Nav;
