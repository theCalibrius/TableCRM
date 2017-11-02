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
        leads: [...action.payload]
      };
  }
  return state;
}
