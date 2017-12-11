import 'handsontable-pro/dist/handsontable.full';
import HotTable from 'react-handsontable';
import { commonTableSetting } from '../lib/helper';

import React from 'react';
// connects the Accounts component to the redux store
import { connect } from 'react-redux';

// styled-component
import styled from 'styled-components';

import {
  getAllAccounts,
  createAndUpdateAccounts,
  deleteAccounts,
  getColumnsOfAccounts
} from '../actions/accountsActions';

const TableWrap = styled.div`
	overflow-x: scroll;
	overflow-y: hidden;
	height: calc(100vh - 60px);
`;

class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { data: 'id' },
        { data: 'description' },
        { data: 'industryID', type: 'numeric' },
        { data: 'email' },
        { data: 'phoneNumber' },
        { data: 'street' },
        { data: 'city' },
        { data: 'state' },
        { data: 'postalCode' },
        { data: 'country' },
        { data: 'website' },
        { data: 'createdAt', type: 'date', readOnly: true },
        { data: 'updatedAt', type: 'date', readOnly: true }
      ],
      colHeaders: [
        'id',
        'description',
        'industryID',
        'email',
        'phoneNumber',
        'street',
        'city',
        'state',
        'postalCode',
        'country',
        'website',
        'createdAt',
        'updatedAt'
      ]
    };
  }
  componentDidMount() {
    this.props.dispatch(getAllAccounts);
    this.props.dispatch(getColumnsOfAccounts.bind(this));
  }
  render() {
    const accountsTableSetting = {
      data: this.props.accounts,
      colHeaders: this.state.colHeaders,
      columns: this.state.columns,
      afterChange: (changes, source) => {
        this.props.dispatch(
          createAndUpdateAccounts(changes, source).bind(this)
        );
      },
      beforeRemoveRow: (index, amount) => {
        this.props.dispatch(deleteAccounts(index, amount).bind(this));
      }
    };
    const tableSettingMerged = Object.assign(
      accountsTableSetting,
      commonTableSetting
    );
    return (
      <TableWrap>
        <div id="table">
          {!this.props.accounts ? (
            <p>loading...</p>
          ) : (
            <HotTable root="hot" ref="hot" settings={tableSettingMerged} />
          )}
        </div>
      </TableWrap>
    );
  }
} // end of class

const mapStateToProps = state => ({
  accounts: state.accountsReducer.accounts
});

export default connect(mapStateToProps, null)(Accounts);
