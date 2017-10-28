// react & redux
import React from 'react';
import { connect } from 'react-redux';
// redux actions
import { getOpportunities } from '../actions/opportunitiesActions';
// api call
import axios from 'axios';
// handsontable
import HotTable from 'react-handsontable';
import 'handsontable-pro/dist/handsontable.full.js';

class Opportunities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(getOpportunities());
  }
  render() {
    return (
      <div>
        <div id="table">
          <HotTable
            root="hot"
            ref="hot"
            settings={{
              licenseKey: '58e7f6926ee806184e95a749',
              data: this.props.opportunities,
              dataSchema: {
                id: null,
                name: null,
                expCloseDate: null,
                createdAt: null
              },
              colHeaders: ['id', 'Name', 'Expected Close Date', 'Created Date'],
              rowHeaders: true,
              minSpareRows: 1,
              stretchH: 'all'
            }}
          />
        </div>
        <p>opp data via redux</p>
        {JSON.stringify(this.props.opportunities)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    opportunities: state.opportunitiesReducer.opportunities
  };
};

export default connect(mapStateToProps, null)(Opportunities);
