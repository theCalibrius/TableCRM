// react & redux
import React from 'react';
import { connect } from 'react-redux';
// redux actions
import { getAllLeads, createAndUpdateLeads, removeLeads } from '../actions/leadsActions';
// api call
import axios from 'axios';
// handsontable
import HotTable from 'react-handsontable';
import 'handsontable-pro/dist/handsontable.full.js';

class Leads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(getAllLeads());
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
                licenseKey: '',
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
                  createdDate: null
                },
                colHeaders: [
                  'id',
                  'ownerId',
                  'description',
                  'firstName',
                  'lastName',
                  'suffix',
                  'title',
                  'value',
                  'email',
                  'phoneNumber',
                  'createdDate'
                ],
                columns: [
                  { data: 'id' },
                  { data: 'ownerId' },
                  { data: 'description' },
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
                  {
                    data: 'createdDate',
                    type: 'date',
                    dateFormat: 'MM/DD/YYYY',
                    correctFormat: true
                  }
                ],
                rowHeaders: true,
                stretchH: 'all',
                contextMenu: ['remove_row', 'copy', 'cut'],
                filters: true,
                dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
                columnSorting: true,
                minSpareRows: 1,
                afterChange: (change, source) => {
                  this.props.dispatch(createAndUpdateLeads(change, source).bind(this));
                },
                beforeRemoveRow: (index, amount) => {
                  this.props.dispatch(removeLeads(index, amount).bind(this));
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
  leads: state.leadsReducer.leads
});

export default connect(mapStateToProps, null)(Leads);
