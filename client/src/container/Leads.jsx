// handsontable
import 'handsontable-pro/dist/handsontable.full';
import 'handsontable-pro/dist/handsontable.full.css';
import HotTable from 'react-handsontable';
// react & redux
import React from 'react';
import { connect } from 'react-redux';
// redux actions
import {
  getAllLeads,
  createAndUpdateLeads,
  deleteLeads,
  getEntityColumnOrders,
  updateEntityColumnOrders
} from '../actions/leadsActions';

class Leads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(getEntityColumnOrders);
    this.props.dispatch(getAllLeads);
  }
  render() {
    return (
      <div>
        <div id="table">
          {!this.props.leads ||
					!this.props.leadsColumnsHeader ||
					!this.props.leadsColumns ? (
              <p>loading...</p>
            ) : (
              <HotTable
                root="hot"
                ref="hot"
                settings={{
                  licenseKey: '7fb69-d3720-89c63-24040-8e45b',
                  data: this.props.leads,
                  dataSchema: {
                    id: null,
                    ownerId: null,
                    description: null,
                    firstName: null,
                    lastName: null,
                    suffix: null,
                    title: null,
                    value: null,
                    email: null,
                    phoneNumber: null,
                    createdAt: null
                  },
                  colHeaders: this.props.leadsColumnsHeader,
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
                  ],
                  hiddenColumns: {
                    columns: [0],
                    indicators: false
                  },
                  manualColumnMove: this.props.leadsColumns,
                  rowHeaders: true,
                  stretchH: 'all',
                  contextMenu: ['remove_row', 'copy', 'cut'],
                  filters: true,
                  dropdownMenu: [
                    'filter_by_condition',
                    'filter_by_value',
                    'filter_action_bar'
                  ],
                  columnSorting: true,
                  minSpareRows: 1,
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
                      updateEntityColumnOrders(columns, target).bind(this)
                    );
                  }
                }}
              />
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  leads: state.leadsReducer.leads,
  leadsColumns: state.leadsReducer.leadsColumns,
  leadsColumnsHeader: state.leadsReducer.leadsColumnsHeader
});

export default connect(mapStateToProps, null)(Leads);
