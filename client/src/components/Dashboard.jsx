// react & redux
import React from 'react';
import { connect } from 'react-redux';
// redux actions
import {
  getTotalOppValuePerStatus,
  getTotalOppValuePerStage
} from '../actions/dashboardActions';
// highcharts
import ReactHighcharts from 'react-highcharts';
// styled-component
import styled from 'styled-components';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // openOppsValuePerStages: {
      //   chart: {
      //     type: 'column',
      //     height: 260
      //   },
      //   title: {
      //     text: null
      //   },
      //   xAxis: {
      //     categories: [
      //       'Qualified',
      //       'Presentation',
      //       'Negotiation',
      //       'Contract Sent',
      //       'Payment'
      //     ],
      //     title: {
      //       // text: 'Closed Status'
      //     }
      //   },
      //   yAxis: {
      //     min: 0,
      //     title: {
      //       text: null
      //     }
      //   },
      //   series: [
      //     {
      //       showInLegend: false,
      //       name: 'Total Value',
      //       data: [29.9, 71.5, 106.4, 300, 42],
      //       color: '#39ACFF'
      //     }
      //   ],
      //   credits: {
      //     enabled: false
      //   }
      // }
    };
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
        {/* <ReactHighcharts
          config={this.state.openOppsValuePerStages}
          ref="chart2"
        /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  totalOppValuePerStatus: state.dashboardReducer.totalOppValuePerStatus,
  totalOppValuePerStage: state.dashboardReducer.totalOppValuePerStage
});

export default connect(mapStateToProps, null)(Dashboard);
