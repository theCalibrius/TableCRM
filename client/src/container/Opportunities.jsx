// handsontable
import HotTable from 'react-handsontable';
import 'handsontable-pro/dist/handsontable.full';
import 'handsontable-pro/dist/handsontable.full.css';
import { commonTableSetting } from '../lib/helper';
// react & redux
import React from 'react';
import { connect } from 'react-redux';
// styled-component
import styled from 'styled-components';
// redux actions
import {
  getAllOpportunities,
  createAndUpdateOpportunities,
  deleteOpportunities
  // getHiddenColumnsOfOpportunities,
  // updateHiddenColumnsOfOpportunities
} from '../actions/opportunitiesActions';

const TableWrap = styled.div`
	overflow-x: scroll;
	overflow-y: hidden;
	height: calc(100vh - 60px);
`;

// start of class
class Opportunities extends React.Component {
  componentDidMount() {
    // this.props.dispatch(getHiddenColumnsOfOpportunities.bind(this));
    this.props.dispatch(getAllOpportunities());
  }
  render() {
    const opportunitiesTableSetting = {
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
        {
          data: 'pipeline',
          type: 'dropdown',
          source: ['Sales', 'Biz Dev']
        },
        { data: 'estimatedValue', type: 'numeric' },
        { data: 'winProbability', type: 'numeric' },
        {
          data: 'priority',
          type: 'dropdown',
          source: ['High', 'Medium', 'Low']
        },
        {
          data: 'status',
          type: 'dropdown',
          source: ['Open', 'Won', 'Lost', 'Abandoned']
        },
        {
          data: 'stage',
          type: 'dropdown',
          source: [
            'Qualified',
            'Presentation',
            'Negotiation',
            'Contract Sent',
            'Payment'
          ]
        },
        { data: 'expectedCloseDate', type: 'date' },
        {
          data: 'lostReason',
          type: 'dropdown',
          source: ['Not Applicable', 'Feature', 'Price', 'Competitor']
        },
        {
          data: 'origin',
          type: 'dropdown',
          source: ['Reference', 'Network', 'Other']
        },
        { data: 'createdAt', type: 'date', readOnly: true },
        { data: 'updatedAt', type: 'date', readOnly: true }
      ],
      hiddenColumns: {
        columns: this.props.hiddenColIndices,
        indicators: true
      },
      afterChange: (changes, source) => {
        this.props.dispatch(
          createAndUpdateOpportunities(changes, source).bind(this)
        );
      },
      beforeRemoveRow: (index, amount) => {
        this.props.dispatch(deleteOpportunities(index, amount).bind(this));
      }
      // afterContextMenuHide: context => {
      //   this.props.dispatch(
      //     updateHiddenColumnsOfOpportunities(context).bind(this)
      //   );
      // }
    };
    const tableSettingMerged = Object.assign(
      opportunitiesTableSetting,
      commonTableSetting
    );
    return (
      <TableWrap>
        <div id="table">
          {!this.props.opportunities ? (
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
  opportunities: state.opportunitiesReducer.opportunities,
  hiddenColIndices: state.opportunitiesReducer.hiddenColIndices
});

export default connect(mapStateToProps)(Opportunities);
