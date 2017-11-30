// react & redux
import React from 'react';
import { connect } from 'react-redux';
// styled-component
import styled from 'styled-components';
// redux actions
import {
  getTotalOppValuePerStatus,
  getTotalOppValuePerStage
} from '../actions/dashboardActions';
// highcharts
import ReactHighcharts from 'react-highcharts';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(getTotalOppValuePerStatus);
    this.props.dispatch(getTotalOppValuePerStage);
  }
  render() {
    return (
      <div>
        {!this.props.totalOppValuePerStatus ? (
          <p>loading...</p>
        ) : (
          <ReactHighcharts
            config={this.props.totalOppValuePerStatus}
            ref="chart2"
          />
        )}
        {!this.props.totalOppValuePerStage ? (
          <p>loading...</p>
        ) : (
          <ReactHighcharts
            config={this.props.totalOppValuePerStage}
            ref="chart2"
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  totalOppValuePerStatus: state.dashboardReducer.totalOppValuePerStatus,
  totalOppValuePerStage: state.dashboardReducer.totalOppValuePerStage
});

export default connect(mapStateToProps, null)(Dashboard);
