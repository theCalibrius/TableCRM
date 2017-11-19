// react & redux
import React from 'react';
import { connect } from 'react-redux';
// redux actions
import { getContacts, createAndUpdateContacts, deleteContacts } from '../actions/contactsActions';
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
  }
  render() {
    return (
      <div>
        <div id="table">
          {!this.props.contacts ? (
            <p>loading...</p>
          ) : (
            <HotTable
              root="hot"
              ref="hot"
              settings={{
                licenseKey: '',
                data: this.props.contacts,
                dataSchema: {
                  id: null,
                  firstName: null,
                  lastName: null,
                  suffix: null,
                  title: null,
                  department: null,
                  description: null,
                  email: null,
                  workPhoneNumber: null,
                  personalPhoneNumber: null,
                  createdAt: null,
                  updatedAt: null
                },
                colHeaders: [
                  'ID',
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
                hiddenColumns: {
                  columns: [0],
                  indicators: false
                },
                rowHeaders: true,
                minSpareRows: 1,
                stretchH: 'all',
                contextMenu: ['remove_row'],
                filters: true,
                dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
                columnSorting: true,
                afterChange: (changes, source) => {
                  this.props.dispatch(createAndUpdateContacts(changes, source).bind(this));
                },
                beforeRemoveRow: (index, amount) => {
                  console.log(`beforeRemoveRow: index: ${index}, amount: ${amount}`);
                  this.props.dispatch(deleteContacts(index, amount).bind(this));
                },
                afterCopy: (index, amount) => {
                  console.log(`afterCopy: index: ${index}, amount: ${amount}`);
                },
                afterPaste: (index, amount) => {
                  console.log(`afterPaste: index: ${index}, amount: ${amount}`);
                }
              }}
            />
          )}
        </div>
        {JSON.stringify(this.props.contacts)}
      </div>
    );
  }
} // end of class

const mapStateToProps = state => ({
  contacts: state.contactsReducer.contacts
});

export default connect(mapStateToProps, null)(Contacts);
