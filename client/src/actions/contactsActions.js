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
    const getNewAndUpdatedRowsBound = getNewAndUpdatedRows.bind(this);
    const newAndUpdatedRows = getNewAndUpdatedRowsBound(changes, source);
    console.log(changes);
    if (newAndUpdatedRows) {
      const newRows = newAndUpdatedRows.newRows;
      const updatedRows = newAndUpdatedRows.updatedRows;

      if (newRows.length > 0) {
        axios.post('/api/contacts', {newRows}).then(() => { dispatch(getContacts); });
      }

      if (updatedRows.length > 0) {
        axios.put('/api/contacts', {updatedRows}).then(() => { dispatch(getContacts); });
      }
    }
  };
}

export function deleteContacts(index, amount) {
  return function(dispatch) {
    // get deleted row ID(s)
    const getRemovedIdsBound = getRemovedIds.bind(this);
    const removedIds = getRemovedIdsBound();
    axios({
      method: 'DELETE',
      url: '/api/contacts',
      data: {
        removedIds
      }
    });
  };
}
