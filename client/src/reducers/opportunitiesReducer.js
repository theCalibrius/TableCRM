export default function(state = { opportunities: null }, action) {
  switch (action.type) {
  case 'GET_ALL_OPPORTUNITIES':
    return {
      ...state,
      opportunities: action.payload.data
    };
  case 'GET_HIDDENCOLUMNS_OF_OPPORTUNITIES':
    return {
      ...state,
      hiddenColIndices: action.payload
    };
  case 'GET_ALL_OPPORTUNITY_IDS_NAMES':
    return {
      ...state,
      opportunityIDsNames: action.payload.data
    };
  case 'GET_ALL_OPPORTUNITY_NAMES':
    return {
      ...state,
      opportunityNames: action.payload
    };
  }
  return state;
}
