export default function(
  state = {
    accounts: null
  },
  action
) {
  switch (action.type) {
    case 'GET_ALL_ACCOUNTS':
      return {
        ...state,
        accounts: [...action.payload]
      };
  }
  return state;
}
