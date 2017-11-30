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
              action.payload.Won ? action.payload.Won : 0,
              action.payload.Lost ? action.payload.Lost : 0,
              action.payload.Abandoned ? action.payload.Abandoned : 0,
              action.payload.Open ? action.payload.Open : 0
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
              action.payload.Qualified ? action.payload.Qualified : 0,
              action.payload.Presentation ? action.payload.Presentation : 0,
              action.payload.Negotiation ? action.payload.Negotiation : 0,
              action.payload['Contract Sent']
                ? action.payload['Contract Sent']
                : 0,
              action.payload.Paymen ? action.payload.Payment : 0
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
