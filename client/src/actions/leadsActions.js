import axios from 'axios';
import { getNewAndUpdatedRows } from '../lib/helper.js';
import { getRemovedIds } from '../lib/getRemovedRowIDsHelper.js';

export function getAllLeads(dispatch) {
  const request = axios.get('/api/leads');
  return {
    type: 'GET_ALL_LEADS',
    payload: request
  };
}

export function createAndUpdateLeads(changes, source) {
  return function(dispatch) {
    const postCallback = function(newRows) {
      axios.post('/api/leads', { newRows }).then(() => {
        dispatch(getAllLeads());
      });
    };

    const putCallback = function(updatedRows) {
      axios.put('/api/leads', { updatedRows }).then(() => {
        dispatch(getAllLeads());
      });
    };

    const getNewAndUpdatedRowsBound = getNewAndUpdatedRows.bind(this);
    getNewAndUpdatedRowsBound(changes, source, postCallback, putCallback);
  };
}

export function removeLeads(index, amount) {
  return function(dispatch) {
    // [startRow, startCol, endRow, endCol]
    // selected rows
    const selectedRows = this.refs.hot.hotInstance.getSelected();
    // get deleted row ID(s)
    const getRemovedIdsBound = getRemovedIds.bind(this);
    const removedIds = getRemovedIdsBound(selectedRows);
    axios({
      method: 'DELETE',
      url: '/api/leads',
      data: {
        removedIds
      }
    });
  };
}
