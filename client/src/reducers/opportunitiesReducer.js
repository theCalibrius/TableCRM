export default function(state = { opportunities: null }, action) {
  switch (action.type) {
  case 'GET_ALL_OPPORTUNITIES':
    return {
      ...state,
      opportunities: action.payload.data
    };
  case 'GET_OPPORTUNITIES_HIDDENCOLUMNS':
    return {
      ...state,
      opportunitiesHiddenColIndices: action.payload
    };
  case 'GET_ALL_OPPORTUNITIES_COLUMNS_HEADER':
    return {
      ...state,
      opportunitiesColumnsHeader: action.payload
    };
  case 'GET_ALL_OPPORTUNITY_IDS_NAMES':
    return {
      ...state,
      opportunityIDsNames: action.payload.data
    };
  case 'GET_COPIED_OPPORTUNITIES':
    return {
      ...state,
      copiedOpportunities: action.payload
    };
  }
  return state;
}
