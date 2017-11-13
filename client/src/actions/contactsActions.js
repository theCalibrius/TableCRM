import axios from 'axios';
import { getRemovedIds } from '../lib/helper';

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
    const getRemovedIdsBound = getRemovedIds.bind(this);
    const removedIds = getRemovedIdsBound(selectedRows);
    axios({
      method: 'DELETE',
      url: '/api/contacts',
      data: {
        removedIds
      }
    });
  };
}
