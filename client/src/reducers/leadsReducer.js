export default function(
  state = {
    leads: null
  },
  action
) {
  switch (action.type) {
  case 'GET_ALL_LEADS':
    return {
      ...state,
      leads: action.payload
    };

  case 'GET_ALL_LEADS_COLUMNS_HEADER':
    return {
      ...state,
      leadsColumnsHeader: action.payload
    };

  case 'GET_LEAD_BY_ID':
    return {
      ...state,
      selectedLead: action.payload
    };
  case 'GET_LEADS_HIDDENCOLUMNS':
    return {
      ...state,
      leadsHiddenColIndices: action.payload
    };
  }
  return state;
}
