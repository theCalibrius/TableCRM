import axios from 'axios';

import { getNewOrUpdatedRows } from '../lib/helper.js';

export function getAllOpportunities() {
  let request = axios.get('/api/opportunities');
  return {
    type: 'GET_ALL_OPPORTUNITIES',
    payload: request
  };
}

export function createOrUpdateOpportunities(changes, source) {
  return function(dispatch) {
    let postCallback = function(newRows) {
      console.log('newRows->', newRows);
      // axios.post('/api/opportunities', {newRows})
      //   .then(() => { dispatch(getAllOpportunities()); });
    };

    let putCallback = function(updatedRows) {
      console.log('updatedRows->',updatedRows);
      // axios.put('/api/opportunities', {updatedRows})
      //   .then(() => { dispatch(getAllOpportunities()); });
    };

    let getNewOrUpdatedRowsBound = getNewOrUpdatedRows.bind(this);
    getNewOrUpdatedRowsBound(changes, source, postCallback, putCallback);
  };
}