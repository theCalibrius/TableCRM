import axios from 'axios';
import { getNewAndUpdatedRows, getRemovedIds } from '../lib/helper';

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

export function createAndUpdateContacts(changes, source) {
  return function(dispatch) {
    let postCallback = function(newRows) {
      axios.post('/api/contacts', {newRows})
        .then(() => { dispatch(getContacts()); });
    };

    let putCallback = function(updatedRows) {
      axios.put('/api/contacts', {updatedRows})
        .then(() => { dispatch(getContacts()); });
    };

    let getNewAndUpdatedRowsBound = getNewAndUpdatedRows.bind(this);
    getNewAndUpdatedRowsBound(changes, source, postCallback, putCallback);
  };
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
