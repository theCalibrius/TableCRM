// react & redux
import React from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
// styled-component
import styled from 'styled-components';
import { getLeadById } from '../actions/leadsActions';
import { getOpportunityById } from '../actions/opportunitiesActions';
import { getContactById } from '../actions/contactsActions';
// right panel fields
import LeadsRightPanelFields from './LeadsRightPanelFields.jsx';
import OpportunitiesRightPanelFields from './OpportunitiesRightPanelFields.jsx';
import ContactsRightPanelFields from './ContactsRightPanelFields.jsx';
//
// ContactsRightPanelFields
// AccountsRightPanelFields

const RightPanelWrap = styled.div`
	overflow-x: hidden;
	overflow-y: scroll;
	height: calc(100vh - 65px);
	position: fixed;
	background-color: #fff;
	z-index: 1000000000;
	width: 800px;
	right: -800px;
	bottom: 0;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.24);
	border-radius: 2px;
	transition: transform 0.3s ease;
`;

const RightPanelInner = styled.div`
	padding: 28px;
`;

const HidePanelButton = styled.div`
	cursor: pointer;
	margin: 0 0 20px 0;
	width: 40px;
`;

const Test = () => <div>test</div>;

class RightPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if (
      this.props.match.path === '/opportunities/:id' &&
			!this.props.selectedOpportunity
    ) {
      const rowId = this.props.match.params.id;
      this.props.dispatch(getOpportunityById(rowId));
    } else if (
      this.props.match.path === '/leads/:id' &&
			!this.props.selectedLead
    ) {
      const rowId = this.props.match.params.id;
      this.props.dispatch(getLeadById(rowId));
    } else if (this.props.match.path === '/contacts/:id') {
      const rowId = this.props.match.params.id;
      this.props.dispatch(getContactById(rowId));
    }
    const rightPanel = document.getElementsByClassName('right_panel')[0];
    if (rightPanel.style.webkitTransform === '') {
      rightPanel.style.webkitTransform = 'translateX(-800px)';
    }
  }
  render() {
    return (
      <RightPanelWrap className="right_panel">
        <RightPanelInner>
          {/* <Route exact path="/leads/:id" component={RightPanelLead} /> */}
          <HidePanelButton>
            <i
              className="material-icons hide_panel"
              onClick={() => {
                if (this.props.match.path === '/opportunities/:id') {
                  this.props.history.push('/opportunities');
                } else if (this.props.match.path === '/leads/:id') {
                  this.props.history.push('/leads');
                } else if (this.props.match.path === '/contacts/:id') {
                  this.props.history.push('/contacts');
                }
                const rightPanel = document.getElementsByClassName(
                  'right_panel'
                )[0];
                rightPanel.style.webkitTransform = 'translateX(800px)';
              }}
            >
							arrow_forward
            </i>
          </HidePanelButton>
          <Route path="/leads" component={LeadsRightPanelFields} />
          <Route
            path="/opportunities"
            component={OpportunitiesRightPanelFields}
          />
          <Route path="/contacts" component={ContactsRightPanelFields} />
        </RightPanelInner>
      </RightPanelWrap>
    );
  }
}

const mapStateToProps = state => ({
  selectedLead: state.leadsReducer.selectedLead
});

export default connect(mapStateToProps, null)(RightPanel);
