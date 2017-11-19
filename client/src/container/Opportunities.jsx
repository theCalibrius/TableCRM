import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getAllOpportunities, createAndUpdateOpportunities, deleteOpportunities } from '../actions/opportunitiesActions';

import HotTable from 'react-handsontable';
import 'handsontable-pro/dist/handsontable.full.js';

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
                    pipeline: null,
                    estimatedValue: null,
                    winProbability: null,
                    priority: null,
                    status: null,
                    stage: null,
                    expectedCloseDate: null,
                    lostReason: null,
                    origin: null,
                    createdAt: null,
                    updatedAt: null
                  },
                  colHeaders: ['id', 'Opportunity Name', 'Description', 'Pipeline', 'Est Value ($)', 'Win Probability (%)', 'Priority', 'Status', 'Stage', 'Expected Close Date', 'Lost Reason', 'Origin', 'Created At', 'Updated At'],
                  columns: [
                    {data: 'id'},
                    {data: 'name'},
                    {data: 'description'},
                    {data: 'pipeline', type: 'dropdown', source: ['Sales', 'Biz Dev']},
                    {data: 'estimatedValue', type: 'numeric'},
                    {data: 'winProbability', type: 'numeric'},
                    {data: 'priority', type: 'dropdown', source: ['High', 'Medium', 'Low']},
                    {data: 'status', type: 'dropdown', source: ['Open', 'Won', 'Lost', 'Abandoned']},
                    {data: 'stage', type: 'dropdown', source: ['Qualified', 'Presentation', 'Negotiation', 'Contract Sent', 'Payment']},
                    {data: 'expectedCloseDate', type: 'date'},
                    {data: 'lostReason', type: 'dropdown', source: ['Not Applicable', 'Feature', 'Price', 'Competitor']},
                    {data: 'origin', type: 'dropdown', source: ['Reference', 'Network', 'Other']},
                    {data: 'createdAt', type: 'date', readOnly: true},
                    {data: 'updatedAt', type: 'date', readOnly: true}
                  ],
                  colWidths: [10, 80, 120, 20, 22, 25, 25, 25],
                  columnSorting: true,
                  filters: true,
                  dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
                  rowHeaders: true,
                  stretchH: 'all',
                  minSpareRows: 1,
                  contextMenu: ['remove_row'],
                  afterChange: (changes, source) => {
                    this.props.dispatch(createAndUpdateOpportunities(changes, source).bind(this));
                  },
                  beforeRemoveRow: (index, amount) => {
                    this.props.dispatch(deleteOpportunities(index, amount).bind(this));
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
