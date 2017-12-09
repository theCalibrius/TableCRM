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
  switch (action.type) {
  case 'GET_CONTACTS_HIDDENCOLUMNS':
    return {
      ...state,
      contactsHiddenColIndices: action.payload
    };
  }
  switch (action.type) {
  case 'GET_ALL_CONTACTS_COLUMNS_HEADER':
    return {
      ...state,
      contactsColumnsHeader: action.payload
    };
  }
  return state;
}
