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

  case 'GET_CONTACTS_HIDDENCOLUMNS':
    return {
      ...state,
      contactsHiddenColIndices: action.payload
    };
  case 'GET_ALL_CONTACTS_COLUMNS_HEADER':
    return {
      ...state,
      contactsColumnsHeader: action.payload
    };
  case 'GET_CONTACT_BY_ID':
    return {
      ...state,
      selectedContact: action.payload
    };
  }
  return state;
}
