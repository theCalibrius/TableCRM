export default function(
  // state = [],
  state = {
    leads: null
  },
  action
) {
  switch (action.type) {
    case 'GET_ALL_LEADS':
      // return action.payload;
      return {
        ...state,
        leads: action.payload
      };
  }
  return state;
}
