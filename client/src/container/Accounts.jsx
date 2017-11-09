import React from 'react';
import { connect } from 'react-redux';

import HotTable from 'react-handsontable';

import 'handsontable-pro/dist/handsontable.full.js';
import 'handsontable-pro/dist/handsontable.full.css';

import { getAccounts } from '../actions/accountsActions';

class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // console.log('Component Did Mount!');
    this.props.dispatch(getAccounts());
  }
  render() {
    return (
      <div>
        <div id="table">
          {!this.props.accounts ? (
            <p>loading...</p>
          ) : (
            <HotTable
              root="hot"
              ref="hot"
              settings={{
                licenseKey: '',
                data: this.props.accounts,
                dataSchema: {
                  id: null,
                  description: null,
                  industryId: null,
                  email: null,
                  phoneNumber: null,
                  street: null,
                  city: null,
                  state: null,
                  postalCode: null,
                  country: null,
                  website: null,
                  createdDate: null
                },
                colHeaders: [
                  'id',
                  'description',
                  'industry',
                  'email',
                  'phoneNumber',
                  'street',
                  'city',
                  'state',
                  'postalCode',
                  'country',
                  'website',
                  'createdDate'
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
      </div>
    );
  }
} // end of class

const mapStateToProps = state => (
{
  accounts: state.accountsReducer.accounts
});

export default connect(mapStateToProps, null)(Accounts);
