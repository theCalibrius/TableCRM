export default function(
  state = {
    totalOppValuePerStatus: null,
    totalOppValuePerStage: null
  },
  action
) {
  switch (action.type) {
  case 'GET_TOTAL_OPP_VALUE_PER_STATUS':
    return {
      ...state,
      totalOppValuePerStatus: {
        chart: {
          type: 'column',
          height: 260
        },
        title: {
          text: null
        },
        xAxis: {
          categories: ['Won', 'Lost', 'Abandoned', 'Open'],
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
            data: [
              action.payload.Won,
              action.payload.Lost,
              action.payload.Abandoned,
              action.payload.Open
            ],
            color: '#39ACFF'
          }
        ],
        credits: {
          enabled: false
        }
      }
    };
  }
  switch (action.type) {
  case 'GET_TOTAL_OPP_VALUE_PER_STAGE':
    return {
      ...state,
      totalOppValuePerStage: {
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
            data: [
              action.payload.Qualified,
              action.payload.Presentation,
              action.payload.Negotiation,
              action.payload['Contract Sent'],
              action.payload.Payment
            ],
            color: '#39ACFF'
          }
        ],
        credits: {
          enabled: false
        }
      }
    };
  }
  return state;
}
