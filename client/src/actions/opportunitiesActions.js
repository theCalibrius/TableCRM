import axios from 'axios';

export function getAllOpportunities() {
  const request = axios.get('/api/opportunities');
  return {
    type: 'GET_ALL_OPPORTUNITIES',
    payload: request
  };
}

export function createOrUpdateOpportunities(changes, source) {
  return function(dispatch) {
    if (changes) {
      // create empty arrays to store new rows and updated rows
      const newRows = [];
      const updatedRows = [];

      // for each cell array in changes array
      for (let cell of changes) {
        // if the row where the cell locates was empty prior to change
        const row = this.refs.hot.hotInstance.getSourceDataAtRow(cell[0]);
        if (row.id === null) {
          // push the row to newRows array
          newRows.push(row);
        // otherwise, if the row where the cell locates was NOT empty prior to change
        } else {
          // push the row to updatedRows array
          updatedRows.push(row);
        }
      }

      if (newRows.length !== 0) {
        axios.post('/api/opportunities', {newRows})
        .then(() => { getAllOpportunities(); });
      }

      if (updatedRows.length !== 0) {

      }
    }
  };
}
