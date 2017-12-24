// react & redux
import React from 'react';
import { connect } from 'react-redux';
// redux actions
import { getContacts,
  createAndUpdateContacts,
  deleteContacts
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

class Contacts extends React.Component {
  // start of class
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(getContacts);
    this.props.dispatch(getAllOpportunityIDsNames());

  }
  render() {
    const opportunityIDsNames = this.props.opportunityIDsNames
      ? this.props.opportunityIDsNames.map(opp => opp.name)
      : null;
    return (
      <div>
        <div id="table">
          {!this.props.contacts && !this.props.opportunityIDsNames ? (
            <p>loading...</p>
          ) : (
            <HotTable
              root="hot"
              ref="hot"
              settings={{
                licenseKey: '7fb69-d3720-89c63-24040-8e45b',
                data: this.props.contacts,
                colHeaders: [
                  'Contact ID',
                  'Opportunity ID',
                  'Opportunity Name',
                  'First Name',
                  'Last Name',
                  'Suffix',
                  'Title',
                  'Department',
                  'Description',
                  'Email',
                  'Work Phone Number',
                  'Personal Phone Number',
                  'Created Date',
                  'Updated Date'
                ],
                columns: [
                  { data: 'id' },
                  { data: 'opportunityID' },
                  {
                    data: 'name',
                    type: 'autocomplete',
                    source: opportunityIDsNames,
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
                ],
                /*hiddenColumns: {
                  columns: [0,1],
                  indicators: false
                },*/
                rowHeaders: true,
                minSpareRows: 1,
                stretchH: 'all',
                contextMenu: ['remove_row'],
                filters: true,
                dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
                columnSorting: true,
                beforeCopy: (data, coords) => {
                  const oppNames = this.props.opportunityIDsNames.map((opp) => {
                    return opp.name;
                  });
                  // check if copied data is valid
                  const revisedData = data.map((d) => { return d[0]; });
                  if ( revisedData.every(elem => oppNames.indexOf(elem) > -1) ) {
                    const copiedRows = coords[0];
                    const opportunityIDs = [];
                    for (let i = copiedRows.startRow; i <= copiedRows.endRow; i++) {
                      opportunityIDs.push(this.refs.hot.hotInstance.getSourceDataAtRow(i).opportunityID);
                    }
                    this.props.dispatch(getCopiedOpportunities(opportunityIDs));
                  }
                },
                afterChange: (changes, source,index, amount) => {
                  if (changes) {
                    if (changes[0][1] != 'name') {
                      this.props.dispatch(createAndUpdateContacts(changes, source).bind(this));
                    }
                    const opportunityIDsNames = this.props.opportunityIDsNames;
                    if (source == 'edit' || source == 'Autofill.fill') {
                      this.props.dispatch(handleRelateOppToContact(changes, opportunityIDsNames,opportunityIDsNames).bind(this));
                    }
                    if (source == 'CopyPaste.paste' || source == 'Autofill.fill') {
                      const oppotunityIDs = this.props.copiedOpportunities;
                      this.props.dispatch(handleRelateOppsToContacts(changes, oppotunityIDs, opportunityIDsNames).bind(this));
                    }

                  }
                },
                beforeRemoveRow: (index, amount) => {
                  this.props.dispatch(deleteContacts(index, amount).bind(this));
                }
              }}
            />
          )}
        </div>
      </div>
    );
  }
} // end of class

const mapStateToProps = state => ({
  contacts: state.contactsReducer.contacts,
  opportunityIDsNames: state.opportunitiesReducer.opportunityIDsNames,
  copiedOpportunities: state.opportunitiesReducer.copiedOpportunities
});

export default connect(mapStateToProps, null)(Contacts);
