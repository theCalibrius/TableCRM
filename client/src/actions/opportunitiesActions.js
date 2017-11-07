import axios from 'axios';

import { getNewAndUpdatedRows } from '../lib/helper.js';

export function getAllOpportunities() {
  let request = axios.get('/api/opportunities');
  return {
    type: 'GET_ALL_OPPORTUNITIES',
    payload: request
  };
}

export function createAndUpdateOpportunities(changes, source) {
  return function(dispatch) {
    let postCallback = function(newRows) {
      axios.post('/api/opportunities', {newRows})
        .then(() => { dispatch(getAllOpportunities()); });
    };

    let putCallback = function(updatedRows) {
      axios.put('/api/opportunities', {updatedRows})
        .then(() => { dispatch(getAllOpportunities()); });
    };

    let getNewAndUpdatedRowsBound = getNewAndUpdatedRows.bind(this);
    getNewAndUpdatedRowsBound(changes, source, postCallback, putCallback);
  };
}