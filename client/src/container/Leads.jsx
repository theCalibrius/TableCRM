// handsontable
import HotTable from 'react-handsontable';
import 'handsontable-pro/dist/handsontable.full';
import 'handsontable-pro/dist/handsontable.full.css';
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

class Leads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { data: 'id' },
        {
          data: 'firstName'
        },
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
    return (
      <TableWrap>
        <div id="table">
          {!this.props.leads ||
					!this.props.leadsColumnsHeader ||
					!this.props.leadsHiddenColIndices ? (
              <p>loading...</p>
            ) : (
              <HotTable
                root="hot"
                ref="hot"
                settings={{
                  licenseKey: '7fb69-d3720-89c63-24040-8e45b',
                  data: this.props.leads,
                  colHeaders: this.props.leadsColumnsHeader,
                  columns: this.state.columns,
                  hiddenColumns: {
                    columns: [0],
                    indicators: false
                  },
                  manualColumnMove: true,
                  rowHeaders: true,
                  height: window.innerHeight - 60,
                  colWidths: 120,
                  contextMenu: [
                    'remove_row',
                    'hidden_columns_show',
                    'hidden_columns_hide'
                  ],
                  hiddenColumns: {
                    columns: this.props.leadsHiddenColIndices,
                    indicators: true
                  },
                  filters: true,
                  dropdownMenu: [
                    'filter_by_condition',
                    'filter_by_value',
                    'filter_action_bar'
                  ],
                  columnSorting: true,
                  minSpareRows: 1,
                  fixedRowsBottom: 1,
                  afterChange: (changes, source) => {
                    this.props.dispatch(
                      createAndUpdateLeads(changes, source).bind(this)
                    );
                  },
                  beforeRemoveRow: (index, amount) => {
                    this.props.dispatch(deleteLeads(index, amount).bind(this));
                  },
                  afterColumnMove: (columns, target) => {
                    this.props.dispatch(
                      updateColumnOrderOfLeads(columns, target).bind(this)
                    );
                  },
                  afterContextMenuHide: context => {
                    this.props.dispatch(
                      updateHiddenColumnsOfLeads(context).bind(this)
                    );
                  }
                }}
              />
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
