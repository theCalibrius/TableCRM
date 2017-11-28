export default function(
  state = {
    totalOppValuePerStatus: null
  },
  action
) {
  switch (action.type) {
  case 'GET_TOTAL_OPP_VALUE_PER_STATUS':
    return {
      ...state,
      // totalOppValuePerStatus: action.payload
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
      totalOppValuePerStage: action.payload
    };
  }
  return state;
}
