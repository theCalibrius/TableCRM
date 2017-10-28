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
        Opportunities
        <div id="table">
          <HotTable
            root="hot"
            ref="hot"
            settings={{
              licenseKey: '58e7f6926ee806184e95a749',
              data: this.props.opportunities,
              colHeaders: true,
              rowHeaders: true
            }}
          />
        </div>
        <p>opp data</p>
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
