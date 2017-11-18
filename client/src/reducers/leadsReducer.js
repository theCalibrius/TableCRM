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
  }
  switch (action.type) {
  case 'GET_ALL_LEADS_COLUMNS':
    return {
      ...state,
      leadsColumns: action.payload
    };
  }
  switch (action.type) {
  case 'GET_ALL_LEADS_COLUMNS_HEADER':
    return {
      ...state,
      leadsColumnsHeader: action.payload
    };
  }
  return state;
}
