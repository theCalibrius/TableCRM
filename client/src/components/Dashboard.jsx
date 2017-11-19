import React from 'react';
import ReactHighcharts from 'react-highcharts';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closedOppsValueStatus: {
        chart: {
          type: 'column',
          height: 260
        },
        title: {
          text: null
        },
        xAxis: {
          categories: ['Won', 'Lost', 'Abandoned'],
          title: {
            // text: 'Closed Status'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: null
          }
        },
        series: [
          {
            showInLegend: false,
            name: 'Total Value',
            data: [29.9, 71.5, 106.4],
            color: '#39ACFF'
          }
        ],
        credits: {
          enabled: false
        }
      },
      openOppsValuePerStages: {
        chart: {
          type: 'column',
          height: 260
        },
        title: {
          text: null
        },
        xAxis: {
          categories: [
            'Qualified',
            'Presentation',
            'Negotiation',
            'Contract Sent',
            'Payment'
          ],
          title: {
            // text: 'Closed Status'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: null
          }
        },
        series: [
          {
            showInLegend: false,
            name: 'Total Value',
            data: [29.9, 71.5, 106.4, 300, 42],
            color: '#39ACFF'
          }
        ],
        credits: {
          enabled: false
        }
      }
    };
  }

  render() {
    return (
      <div>
        <ReactHighcharts
          config={this.state.closedOppsValueStatus}
          ref="chart2"
        />
        <ReactHighcharts
          config={this.state.openOppsValuePerStages}
          ref="chart2"
        />
      </div>
    );
  }
}
export default Dashboard;
