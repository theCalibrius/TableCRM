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
      totalOppValuePerStatus: action.payload
    };
  }
  // switch (action.type) {
  // case 'GET_ALL_LEADS_COLUMNS':
  //   return {
  //     ...state,
  //     leadsColumns: action.payload
  //   };
  // }
  // switch (action.type) {
  // case 'GET_ALL_LEADS_COLUMNS_HEADER':
  //   return {
  //     ...state,
  //     leadsColumnsHeader: action.payload
  //   };
  // }
  return state;
}
