import React from 'react';
import { connect } from 'react-redux';
import { getAllOpportunities } from '../actions/opportunitiesActions';
import axios from 'axios';

import HotTable from 'react-handsontable';
import 'handsontable-pro/dist/handsontable.full.js';
import 'handsontable-pro/dist/handsontable.full.css';

// start of class
class Opportunities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(getAllOpportunities());
  }
  render() {
    return (
      <div>
        <div id="table">
          {!this.props.opportunities
            ? <p>loading...</p>
            : <HotTable
                root="hot"
                ref="hot"
                settings={{
                  licenseKey: '',
                  data: this.props.opportunities,
                  dataSchema: {
                    id: null,
                    name: null,
                    description: null,
                    estimatedValue: null,
                    winProbability: null,
                    expectedCloseDate: null
                  },
                  colHeaders: ['id', 'Opportunity Name', 'Description', 'Est Value ($)', 'Win Probability (%)', 'Expected Close Date'],
                  colWidths: [10, 50, 80, 15, 22, 25],
                  columnSorting: true,
                  filters: true,
                  dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
                  rowHeaders: true,
                  stretchH: 'all',
                  minSpareRows: 1,
                  contextMenu: ['remove_row', 'copy', 'cut'],
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
              />}
        </div>
      </div>
    );
  }
} // end of class

const mapStateToProps = state => ({
  opportunities: state.opportunitiesReducer.opportunities
});

export default connect(mapStateToProps)(Opportunities);
