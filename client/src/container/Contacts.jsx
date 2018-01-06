import { Route } from 'react-router-dom';
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
  updateSource,
  updateHiddenColumnsOfContacts,
  updateColumnOrderOfContacts,
  displayDetailButtonOnContacts
} from '../actions/contactsActions';
import {
  getAllOpportunityIDsNames,
  relateOppToContact,
  handleRelateOppToContact,
  handleRelateOppsToContacts,
  getCopiedOpportunities
} from '../actions/opportunitiesActions';

// api call
import axios from 'axios';
// handsontable
import HotTable from 'react-handsontable';
import 'handsontable-pro/dist/handsontable.full.js';
// import 'handsontable-pro/dist/handsontable.full.css';
import { commonTableSetting } from '../lib/helper';
// right panel
import RightPanel from '../components/RightPanel.jsx';

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
        { data: 'opportunityID' },
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
      beforeRemoveRow: (index, amount) => {
        this.props.dispatch(deleteContacts(index, amount).bind(this));
      },
      afterInit: () => {
        this.props.dispatch(updateSource.bind(this));
      },
      afterColumnMove: (columns, target) => {
        this.props.dispatch(
          updateColumnOrderOfContacts(columns, target).bind(this)
        );
      },
      afterContextMenuHide: context => {
        this.props.dispatch(updateHiddenColumnsOfContacts(context).bind(this));
      },
      beforeCopy: (data, coords) => {
        const oppNames = this.props.opportunityIDsNames.map(opp => opp.name);
        // check if copied data is valid
        const revisedData = data.map(d => d[0]);
        if (revisedData.every(elem => oppNames.indexOf(elem) > -1)) {
          const copiedRows = coords[0];
          const opportunityIDs = [];
          for (let i = copiedRows.startRow; i <= copiedRows.endRow; i++) {
            opportunityIDs.push(
              this.refs.hot.hotInstance.getSourceDataAtRow(i).opportunityID
            );
          }
          this.props.dispatch(getCopiedOpportunities(opportunityIDs));
        }
      },
      afterChange: (changes, source, index, amount) => {
        if (changes) {
          if (changes[0][1] != 'name') {
            this.props.dispatch(
              createAndUpdateContacts(changes, source).bind(this)
            );
          }
          const opportunityIDsNames = this.props.opportunityIDsNames;
          if (source == 'edit' || source == 'Autofill.fill') {
            this.props.dispatch(
              handleRelateOppToContact(
                changes,
                opportunityIDsNames,
                opportunityIDsNames
              ).bind(this)
            );
          }
          if (source == 'CopyPaste.paste' || source == 'Autofill.fill') {
            const oppotunityIDs = this.props.copiedOpportunities;
            this.props.dispatch(
              handleRelateOppsToContacts(
                changes,
                oppotunityIDs,
                opportunityIDsNames
              ).bind(this)
            );
          }
        }
      },
      afterOnCellMouseOver: (event, coords, td) => {
        this.props.dispatch(
          displayDetailButtonOnContacts(event, coords, td).bind(this)
        );
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
        <Route path={`${this.props.match.url}/:id`} component={RightPanel} />
      </TableWrap>
    );
  }
} // end of class

const mapStateToProps = state => ({
  contacts: state.contactsReducer.contacts,
  opportunityIDsNames: state.opportunitiesReducer.opportunityIDsNames,
  contactsHiddenColIndices: state.contactsReducer.contactsHiddenColIndices,
  contactsColumnsHeader: state.contactsReducer.contactsColumnsHeader,
  copiedOpportunities: state.opportunitiesReducer.copiedOpportunities,
  selectedContact: state.contactsReducer.selectedContact
});

export default connect(mapStateToProps, null)(Contacts);
