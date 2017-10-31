// react & redux
import React from 'react';
import { connect } from 'react-redux';
// redux actions
import { getLeads } from '../actions/leadsActions';
// api call
import axios from 'axios';
// handsontable
import HotTable from 'react-handsontable';
import 'handsontable-pro/dist/handsontable.full.js';
import 'handsontable-pro/dist/handsontable.full.css';

class Leads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(getLeads());
  }
  render() {
    return (
      <div>
        <div id="table">
          <HotTable
            root="hot"
            ref="hot"
            settings={{
              licenseKey: '58e7f6926ee806184e95a749',
              data: this.props.leads,
              dataSchema: {
                id: null,
                firstName: null,
                lastName: null,
                createdDate: null
              },
              colHeaders: ['id', 'firstName', 'lastName', 'Created Date'],
              rowHeaders: true,
              minSpareRows: 1,
              stretchH: 'all',
              contextMenu: ['remove_row', 'copy', 'cut'],
              filters: true,
              dropdownMenu: [
                'filter_by_condition',
                'filter_by_value',
                'filter_action_bar'
              ],
              columnSorting: true,
              afterChange: (change, source) => {
                console.log(
                  `afterChange: change: ${change}, source: ${source}`
                );
              },
              beforeRemoveRow: (index, amount) => {
                console.log(
                  `beforeRemoveRow: index: ${index}, amount: ${amount}`
                );
              },
              afterCopy: (index, amount) => {
                console.log(`afterCopy: index: ${index}, amount: ${amount}`);
              },
              afterPaste: (index, amount) => {
                console.log(`afterPaste: index: ${index}, amount: ${amount}`);
              }
            }}
          />
        </div>
        <p>opp data via redux</p>
        {JSON.stringify(this.props.leads)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    leads: state.leadsReducer.leads
  };
};

export default connect(mapStateToProps, null)(Leads);
