import React from 'react';
import { connect } from 'react-redux';
import HotTable from 'react-handsontable';
import 'handsontable-pro/dist/handsontable.full';

import {
  getAllOpportunities,
  createAndUpdateOpportunities,
  deleteOpportunities,
  getHiddenColumnsOfOpportunities,
  updateHiddenColumnsOfOpportunities
} from '../actions/opportunitiesActions';

// start of class
class Opportunities extends React.Component {
  componentDidMount() {
    this.props.dispatch(getAllOpportunities());
    this.props.dispatch(getHiddenColumnsOfOpportunities.bind(this));
  }
  render() {
    return (
      <div>
        <div id="table">
          {!this.props.opportunities ? (
            <p>loading...</p>
          ) : (
            <HotTable
              root="hot"
              ref="hot"
              settings={{
                licenseKey: '',
                data: this.props.opportunities,
                colHeaders: [
                  'id',
                  'Opportunity Name',
                  'Description',
                  'Pipeline',
                  'Est Value ($)',
                  'Win Probability (%)',
                  'Priority',
                  'Status',
                  'Stage',
                  'Expected Close Date',
                  'Lost Reason',
                  'Origin',
                  'Created At',
                  'Updated At'
                ],
                columns: [
                  { data: 'id' },
                  { data: 'name' },
                  { data: 'description' },
                  { data: 'pipeline', type: 'dropdown', source: ['Sales', 'Biz Dev'] },
                  { data: 'estimatedValue', type: 'numeric' },
                  { data: 'winProbability', type: 'numeric' },
                  { data: 'priority', type: 'dropdown', source: ['High', 'Medium', 'Low'] },
                  { data: 'status', type: 'dropdown', source: ['Open', 'Won', 'Lost', 'Abandoned'] },
                  {
                    data: 'stage',
                    type: 'dropdown',
                    source: ['Qualified', 'Presentation', 'Negotiation', 'Contract Sent', 'Payment']
                  },
                  { data: 'expectedCloseDate', type: 'date' },
                  {
                    data: 'lostReason',
                    type: 'dropdown',
                    source: ['Not Applicable', 'Feature', 'Price', 'Competitor']
                  },
                  { data: 'origin', type: 'dropdown', source: ['Reference', 'Network', 'Other'] },
                  { data: 'createdAt', type: 'date', readOnly: true },
                  { data: 'updatedAt', type: 'date', readOnly: true }
                ],
                colWidths: [10, 80, 120, 20, 22, 25, 25, 25],
                columnSorting: true,
                filters: true,
                dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
                rowHeaders: true,
                stretchH: 'all',
                minSpareRows: 1,
                contextMenu: ['remove_row', 'hidden_columns_show', 'hidden_columns_hide'],
                hiddenColumns: { columns: this.props.hiddenColIndices, indicators: true },
                afterChange: (changes, source) => {
                  this.props.dispatch(createAndUpdateOpportunities(changes, source).bind(this));
                },
                beforeRemoveRow: (index, amount) => {
                  this.props.dispatch(deleteOpportunities(index, amount).bind(this));
                },
                afterContextMenuHide: context => {
                  this.props.dispatch(updateHiddenColumnsOfOpportunities(context).bind(this));
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
  opportunities: state.opportunitiesReducer.opportunities,
  hiddenColIndices: state.opportunitiesReducer.hiddenColIndices
});

export default connect(mapStateToProps)(Opportunities);
