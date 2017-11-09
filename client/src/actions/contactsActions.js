import axios from 'axios';
import { getDeletedIds } from '../lib/helper.js';

export function getContacts(dispatch) {
  axios
    .get('/api/contacts')
    .then(response => {
      dispatch({
        type: 'GET_ALL_CONTACTS',
        payload: response.data
      });
    })
    .catch(err => {
      console.error.bind(err);
    });
}

export function beforeRemoveContacts(index, amount) {
  return function(dispatch) {
    console.log('index ->', index);
    console.log('amount ->', amount);
    // [startRow, startCol, endRow, endCol]
    console.log('selected ->', this.refs.hot.hotInstance.getSelected());
    // selected rows
    const selectedRows = this.refs.hot.hotInstance.getSelected();
    // get deleted row ID(s)
    let getDeletedIdsBound = getDeletedIds.bind(this);
    const removedIds = getDeletedIdsBound(selectedRows);
    axios({
      method: 'DELETE',
      url: '/api/contacts',
      data: {
        removedIds
      }
    });
  };
}
