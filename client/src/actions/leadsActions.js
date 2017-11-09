import axios from 'axios';

import { getNewAndUpdatedRows } from '../lib/helper.js';

export function getAllLeads() {
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
        dispatch(getAllOpportunities());
      });
    };

    const putCallback = function(updatedRows) {
      axios.put('/api/leads', { updatedRows }).then(() => {
        dispatch(getAllOpportunities());
      });
    };

    const getNewAndUpdatedRowsBound = getNewAndUpdatedRows.bind(this);
    getNewAndUpdatedRowsBound(changes, source, postCallback, putCallback);
  };
}

export function beforeRemoveRow(index, amount) {
  return function(dispatch) {
    console.log('index ->', index);
    console.log('amount ->', amount);
    console.log('selected ->', this.refs.hot.hotInstance.getSelected());
    // [startRow, startCol, endRow, endCol]
    const removedId = this.refs.hot.hotInstance.getDataAtRow(index)[0];
    // indexs
    const startRow = this.refs.hot.hotInstance.getSelected()[0];
    const endRow = this.refs.hot.hotInstance.getSelected()[2];
    // smallest and biggest index
    let smallestRowIndex;
    let biggestRowIndex;
    if (startRow < endRow) {
      smallestRowIndex = startRow;
      biggestRowIndex = endRow;
    } else if (startRow > endRow) {
      smallestRowIndex = endRow;
      biggestRowIndex = startRow;
    } else {
      smallestRowIndex = endRow;
      biggestRowIndex = startRow;
    }
    // get list of deleted index
    const removedIds = [];
    for (let i = smallestRowIndex; i <= biggestRowIndex; i++) {
      removedIds.push(this.refs.hot.hotInstance.getDataAtRow(i)[0]);
    }
    console.log(removedIds);

    axios({
      method: 'DELETE',
      url: '/api/leads',
      data: {
        removedIds
      }
    });
  };
}
