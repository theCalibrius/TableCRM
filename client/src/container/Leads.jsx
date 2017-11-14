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
  deleteLeads
} from '../actions/leadsActions';

class Leads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
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
                  'createdAt'
                ],
                columns: [
                  { data: 'id' },
                  { data: 'ownerId' },
                  { data: 'description' },
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
                  {
                    data: 'createdAt',
                    type: 'date',
                    dateFormat: 'MM/DD/YYYY',
                    correctFormat: true
                    // readOnly: true
                  }
                ],
                // hiddenColumns: {
                //   columns: [0],
                //   indicators: false
                // },
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
