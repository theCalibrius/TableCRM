// handsontable
import HotTable from 'react-handsontable';
import 'handsontable-pro/dist/handsontable.full';
// import 'handsontable-pro/dist/handsontable.full.css';
import { commonTableSetting } from '../lib/helper';
// react & redux
import React from 'react';
import { connect } from 'react-redux';
// styled-component
import styled from 'styled-components';
// redux actions
import {
  getAllLeads,
  createAndUpdateLeads,
  deleteLeads,
  getColumnsOfLeads,
  updateColumnOrderOfLeads,
  updateHiddenColumnsOfLeads
} from '../actions/leadsActions';

const TableWrap = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  height: calc(100vh - 60px);
`;

export class Leads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { data: 'id' },
        { data: 'firstName' },
        { data: 'lastName' },
        { data: 'suffix' },
        { data: 'title' },
        {
          data: 'value',
          type: 'numeric',
          format: '$0,0.00'
        },
        { data: 'email' },
        { data: 'phoneNumber' },
        { data: 'description' },
        {
          data: 'createdAt',
          type: 'date',
          dateFormat: 'MM/DD/YYYY',
          correctFormat: true,
          readOnly: true
        },
        { data: 'ownerId' }
      ]
    };
  }
  componentDidMount() {
    this.props.dispatch(getColumnsOfLeads.bind(this));
    this.props.dispatch(getAllLeads);
  }
  render() {
    const leadsTableSetting = {
      data: this.props.leads,
      colHeaders: this.props.leadsColumnsHeader,
      columns: this.state.columns,
      hiddenColumns: {
        columns: this.props.leadsHiddenColIndices,
        indicators: true
      },
      afterChange: (changes, source) => {
        this.props.dispatch(createAndUpdateLeads(changes, source).bind(this));
      },
      beforeRemoveRow: (index, amount) => {
        this.props.dispatch(deleteLeads(index, amount).bind(this));
      },
      afterColumnMove: (columns, target) => {
        this.props.dispatch(updateColumnOrderOfLeads(columns, target).bind(this));
      },
      afterContextMenuHide: context => {
        this.props.dispatch(updateHiddenColumnsOfLeads(context).bind(this));
      }
    };
    const tableSettingMerged = Object.assign(leadsTableSetting, commonTableSetting);
    return (
      <TableWrap>
        <div id="table">
          {!this.props.leads || !this.props.leadsColumnsHeader || !this.props.leadsHiddenColIndices ? (
            <p>loading...</p>
          ) : (
            <HotTable root="hot" ref="hot" settings={tableSettingMerged} />
          )}
        </div>
      </TableWrap>
    );
  }
}

const mapStateToProps = state => ({
  leads: state.leadsReducer.leads,
  leadsColumnsHeader: state.leadsReducer.leadsColumnsHeader,
  leadsHiddenColIndices: state.leadsReducer.leadsHiddenColIndices
});

export default connect(mapStateToProps, null)(Leads);
