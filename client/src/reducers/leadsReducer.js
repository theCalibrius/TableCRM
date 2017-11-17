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
        leadsColums: action.payload
      };
  }
  return state;
}
