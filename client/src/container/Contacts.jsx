// react & redux
import React from 'react';
import { connect } from 'react-redux';
// styled-component
import styled from 'styled-components';
// redux actions
import {
  getContacts,
  createAndUpdateContacts,
  deleteContacts,
  getColumnsOfContacts,
  updateSource
} from '../actions/contactsActions';
import {
  getAllOpportunityIDsNames,
  relateOppToContact
} from '../actions/opportunitiesActions';

// api call
import axios from 'axios';
// handsontable
import HotTable from 'react-handsontable';
import 'handsontable-pro/dist/handsontable.full.js';
// import 'handsontable-pro/dist/handsontable.full.css';
import { commonTableSetting } from '../lib/helper';

const TableWrap = styled.div`
	overflow-x: scroll;
	overflow-y: hidden;
	height: calc(100vh - 60px);
`;

class Contacts extends React.Component {
  // start of class
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { data: 'id' },
        {
          data: 'name',
          type: 'autocomplete',
          source: this.props.opportunityIDsNames
            ? this.props.opportunityIDsNames.map(i => i.name)
            : null,
          strict: false
        },
        { data: 'firstName' },
        { data: 'lastName' },
        { data: 'suffix' },
        { data: 'title' },
        { data: 'department' },
        { data: 'description' },
        { data: 'email' },
        { data: 'workPhoneNumber' },
        { data: 'personalPhoneNumber' },
        {
          data: 'createdAt',
          type: 'date',
          dateFormat: 'MM/DD/YYYY',
          correctFormat: false,
          readOnly: true
        },
        {
          data: 'updatedAt',
          type: 'date',
          dateFormat: 'MM/DD/YYYY',
          correctFormat: false,
          readOnly: true
        }
      ]
    };
  }
  componentDidMount() {
    this.props.dispatch(getAllOpportunityIDsNames());
    this.props.dispatch(getColumnsOfContacts.bind(this));
    this.props.dispatch(getContacts);
  }
  render() {
    const contactsTableSetting = {
      data: this.props.contacts,
      colHeaders: this.props.contactsColumnsHeader,
      columns: this.state.columns,
      hiddenColumns: {
        columns: this.props.contactsHiddenColIndices,
        indicators: true
      },
      afterChange: (changes, source) => {
        const opportunityIDsNames = this.props.opportunityIDsNames;
        if (changes && changes[0][1] != 'name') {
          this.props.dispatch(
            createAndUpdateContacts(changes, source).bind(this)
          );
        }
        if (changes) {
          const selectedOpportunityName = changes[0][3];
          // get Opp ID
          const oppID = opportunityIDsNames
            .filter(({ name }) => name === selectedOpportunityName)
            .map(({ id }) => id)[0];
          if (
            changes[0][1] === 'name' &&
						selectedOpportunityName !== null &&
						opportunityIDsNames.find(o => o.name === selectedOpportunityName)
          ) {
            this.props.dispatch(
              relateOppToContact(changes, source, oppID).bind(this)
            );
          }
        }
      },
      beforeRemoveRow: (index, amount) => {
        this.props.dispatch(deleteContacts(index, amount).bind(this));
      },
      afterInit: () => {
        this.props.dispatch(updateSource.bind(this));
      }
    };
    const tableSettingMerged = Object.assign(
      contactsTableSetting,
      commonTableSetting
    );
    return (
      <TableWrap>
        <div id="table">
          {!this.props.contacts || !this.props.opportunityIDsNames ? (
            <p>loading...</p>
          ) : (
            <HotTable root="hot" ref="hot" settings={contactsTableSetting} />
          )}
        </div>
      </TableWrap>
    );
  }
} // end of class

const mapStateToProps = state => ({
  contacts: state.contactsReducer.contacts,
  opportunityIDsNames: state.opportunitiesReducer.opportunityIDsNames,
  contactsHiddenColIndices: state.contactsReducer.contactsHiddenColIndices,
  contactsColumnsHeader: state.contactsReducer.contactsColumnsHeader
});

export default connect(mapStateToProps, null)(Contacts);
