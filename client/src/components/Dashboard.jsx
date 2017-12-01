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

const DashboardWrap = styled.div`
	background: #ededed;
	padding: 40px 40px 0 40px;
	overflow-y: scroll;
	height: calc(100vh - 110px);
`;

const DashboardCard = styled.div`
	background: #ffffff;
	padding: 28px;
	height: 300px;
	border-radius: 2px;
	margin: 0 0 40px 0;
`;

const CardTitle = styled.p`
	font-size: 18px;
	margin: 0 0 32px 0;
	font-weight: 500;
`;

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
      <DashboardWrap>
        <DashboardCard>
          <CardTitle>Sales Performance</CardTitle>
          {!this.props.totalOppValuePerStatus ? (
            <p>loading...</p>
          ) : (
            <ReactHighcharts
              config={this.props.totalOppValuePerStatus}
              ref="chart2"
            />
          )}
        </DashboardCard>
        <DashboardCard>
          <CardTitle>Pipeline Summary Total</CardTitle>
          {!this.props.totalOppValuePerStage ? (
            <p>loading...</p>
          ) : (
            <ReactHighcharts
              config={this.props.totalOppValuePerStage}
              ref="chart2"
            />
          )}
        </DashboardCard>
      </DashboardWrap>
    );
  }
}

const mapStateToProps = state => ({
  totalOppValuePerStatus: state.dashboardReducer.totalOppValuePerStatus,
  totalOppValuePerStage: state.dashboardReducer.totalOppValuePerStage
});

export default connect(mapStateToProps, null)(Dashboard);
