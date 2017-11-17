// handsontable
import 'handsontable-pro/dist/handsontable.full';
import 'handsontable-pro/dist/handsontable.full.css';
import HotTable from 'react-handsontable';
// react & redux
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// redux actions
import {
  getAllLeads,
  createAndUpdateLeads,
  deleteLeads,
  getLeadsColumnOrders
} from '../actions/leadsActions';

class Leads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(getLeadsColumnOrders);
    this.props.dispatch(getAllLeads);
  }
  render() {
    return (
      <div>
        <div id="table">
          {!this.props.leads ? (
            <p>loading...</p>
          ) : (
            <HotTable
              root="hot"
              ref="hot"
              settings={{
                licenseKey: '7fb69-d3720-89c63-24040-8e45b',
                data: this.props.leads,
                // dataSchema: {
                //   id: null,
                //   ownerId: null,
                //   description: null,
                //   firstName: null,
                //   lastName: null,
                //   suffix: null,
                //   title: null,
                //   value: null,
                //   email: null,
                //   phoneNumber: null,
                //   createdAt: null
                // },
                colHeaders: this.props.leadsColumns,
                columns: [
                  { data: 'id',
                    type: 'text',
                    format: null,
                    correctFormat: false,
                    readOnly: false
                  },
                  { data: 'ownerId',
                    type: 'text',
                    format: null,
                    correctFormat: false,
                    readOnly: false
                  },
                  { data: 'description',
                    type: 'text',
                    format: null,
                    correctFormat: false,
                    readOnly: false
                  },
                  { data: 'firstName',
                    type: 'text',
                    format: null,
                    correctFormat: false,
                    readOnly: false
                  },
                  { data: 'lastName',
                    type: 'text',
                    format: null,
                    correctFormat: false,
                    readOnly: false
                  },
                  { data: 'suffix',
                    type: 'text',
                    format: null,
                    correctFormat: false,
                    readOnly: false
                  },
                  { data: 'title',
                    type: 'text',
                    format: null,
                    correctFormat: false,
                    readOnly: false
                  },
                  {
                    data: 'value',
                    type: 'numeric',
                    format: '$0,0.00',
                    correctFormat: false,
                    readOnly: false
                  },
                  { data: 'email',
                    type: 'text',
                    format: null,
                    correctFormat: false,
                    readOnly: false
                  },
                  { data: 'phoneNumber',
                    type: 'text',
                    format: null,
                    correctFormat: false,
                    readOnly: false
                  },
                  {
                    data: 'createdAt',
                    type: 'date',
                    dateFormat: 'MM/DD/YYYY',
                    correctFormat: true,
                    readOnly: true
                  }
                ],
                hiddenColumns: {
                  columns: [1],
                  indicators: false
                },
                manualColumnMove: true,
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
                  // Array of visual column indexes that were moved.
                  console.log(columns);
                  // Visual column index being a target for moved columns.
                  console.log(target);
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
  leadsColumns: state.leadsReducer.leadsColums
});

export default connect(mapStateToProps, null)(Leads);
