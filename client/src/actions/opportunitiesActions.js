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
    let getNewOrUpdatedRowsBound = getNewOrUpdatedRows.bind(this);

    getNewOrUpdatedRowsBound(changes, source,
      function(newRows) { console.log('newRows->', newRows); },
      function(updatedRows) { console.log('updatedRows->',updatedRows); }
    );
  };
}
