import axios from 'axios';
import moment from 'moment';
import { getNewAndUpdatedRows, getRemovedIds, validateCellData } from '../lib/helper';

export function getAllLeads(dispatch) {
  axios
    .get('/api/leads')
    .then(response => {
      for (const row of response.data) {
        if (row.createdAt)
          row.createdAt = moment(new Date(row.createdAt)).format('MM/DD/YYYY');
      }
      return response;
    })
    .then(response => {
      dispatch({
        type: 'GET_ALL_LEADS',
        payload: response.data
      });
    })
    .catch(err => {
      console.error.bind(err);
    });
}

export function createAndUpdateLeads(changes, source) {
  return function(dispatch) {
    const validateCellDataBound = validateCellData.bind(this);
    validateCellDataBound(changes, validationResult => {
      if(validationResult){
        const postCallback = function(newRows) {
          axios.post('/api/leads', { newRows }).then(() => {
            dispatch(getAllLeads);
          });
        };

        const putCallback = function(updatedRows) {
          axios.put('/api/leads', { updatedRows }).then(() => {
            dispatch(getAllLeads);
          });
        };

        const getNewAndUpdatedRowsBound = getNewAndUpdatedRows.bind(this);
        getNewAndUpdatedRowsBound(changes, source, postCallback, putCallback);
      }
    });
  };
}

export function deleteLeads(index, amount) {
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
