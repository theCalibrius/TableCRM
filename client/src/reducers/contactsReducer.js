export default function(
  state = {
    contacts: null
  },
  action
) {
  switch (action.type) {
    case 'GET_ALL_CONTACTS':
      return {
        ...state,
        contacts: action.payload
      };
  }
  return state;
}
