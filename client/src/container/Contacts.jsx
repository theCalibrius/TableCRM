// react & redux
import React from 'react';
import { connect } from 'react-redux';
// redux actions
import { getContacts } from '../actions/contactsActions';
// api call
import axios from 'axios';
// handsontable
import HotTable from 'react-handsontable';
import 'handsontable-pro/dist/handsontable.full.js';
import 'handsontable-pro/dist/handsontable.full.css';

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
                  firstName: null,
                  lastName: null,
                  suffix: null,
                  title: null,
                  department: null,
                  description: null,
                  email: null,
                  workPhoneNumber: null,
                  personalPhoneNumber: null,
                  createdDate: null,
                  updatedDate: null
                },
                colHeaders: [
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
                rowHeaders: true,
                minSpareRows: 1,
                stretchH: 'all',
                contextMenu: ['remove_row', 'copy', 'cut'],
                filters: true,
                dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
                columnSorting: true,
                afterChange: (change, source) => {
                  console.log(`afterChange: change: ${change}, source: ${source}`);
                },
                beforeRemoveRow: (index, amount) => {
                  console.log(`beforeRemoveRow: index: ${index}, amount: ${amount}`);
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
