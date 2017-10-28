export default function(
  state = {
    opportunities: null
  },
  action
) {
  switch (action.type) {
    case 'GET_ALL_OPPORTUNITIES':
      return {
        ...state,
        opportunities: [...action.payload]
      };
  }
  return state;
}
