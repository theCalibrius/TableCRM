// react & redux
import React from 'react';
import { connect } from 'react-redux';
// redux actions
import { getOpportunities } from '../actions/opportunitiesActions';
// api call
import axios from 'axios';
// handsontable
import HotTable from 'react-handsontable';
import 'handsontable-pro/dist/handsontable.full.js';
import 'handsontable-pro/dist/handsontable.full.css';

class Opportunities extends React.Component { // start of class
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(getOpportunities());
  }
  render() {
    return (
      <div>
        <div id='table'>
          {!this.props.opportunities ? (<p>loading...</p>) : (
            <HotTable
              root='hot'
              ref='hot'
              settings={{
                licenseKey: '',
                data: this.props.opportunities,
                dataSchema: {
                  name: null,
                  description: null,
                  estimatedValue: null,
                  winProbability: null,
                  expectedCloseDate: null
                },
                colHeaders: [
                  'Name',
                  'Description',
                  'Est Value ($)',
                  'Win Probability (%)',
                  'Expected Close Date'
                ],
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
            />)
          }
        </div>
        {JSON.stringify(this.props.opportunities)}
      </div>
    );
  }
} // end of class

const mapStateToProps = state => {
  return {
    opportunities: state.opportunitiesReducer.opportunities
  };
};

export default connect(mapStateToProps, null)(Opportunities);
