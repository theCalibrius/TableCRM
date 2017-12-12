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
  case 'GET_ACCOUNTS_HIDDENCOLUMNS':
    return {
      ...state,
      accountsHiddenColIndices: action.payload
    };
  case 'GET_ALL_ACCOUNTS_COLUMNS_HEADER':
    return {
      ...state,
      accountsColumnsHeader: action.payload
    };
  }
  return state;
}
