import axios from 'axios';

import {
  getNewAndUpdatedRows,
  getRemovedIds,
  getHiddenColsFromContext,
  colPropsToIndices,
  getHiddenColsFromResponse,
  getSortedColumnsByRank
} from '../lib/helper';

export function getAllOpportunities() {
  const request = axios.get('/api/opportunities');
  return {
    type: 'GET_ALL_OPPORTUNITIES',
    payload: request
  };
}

export function createAndUpdateOpportunities(changes, source) {
  return function(dispatch) {
    const getNewAndUpdatedRowsBound = getNewAndUpdatedRows.bind(this);
    const newAndUpdatedRows = getNewAndUpdatedRowsBound(changes, source);

    if (newAndUpdatedRows) {
      const newRows = newAndUpdatedRows.newRows;
      const updatedRows = newAndUpdatedRows.updatedRows;

      if (newRows.length > 0) {
        axios.post('/api/opportunities', { newRows }).then(() => {
          dispatch(getAllOpportunities());
        });
      }

      if (updatedRows.length > 0) {
        axios.put('/api/opportunities', { updatedRows }).then(() => {
          dispatch(getAllOpportunities());
        });
      }
    }
  };
}

export function deleteOpportunities(index, amount) {
  return function(dispatch) {
    const getRemovedIdsBound = getRemovedIds.bind(this);
    const removedIds = getRemovedIdsBound();
    axios({
      method: 'DELETE',
      url: '/api/opportunities',
      data: { removedIds }
    });
  };
}

export function getColumnsOfOpportunities(dispatch) {
  axios
    .get('/api/opportunities/columns')
    .then(response => {
      const hiddenColumnsIndexes = getHiddenColsFromResponse(response);
      dispatch({
        type: 'GET_OPPORTUNITIES_HIDDENCOLUMNS',
        payload: hiddenColumnsIndexes
      });
      return response;
    })
    .then(response => {
      const columns = response.data;
      const getSortedColumnsByRankBind = getSortedColumnsByRank.bind(this);
      return getSortedColumnsByRankBind(columns);
    })
    .then(columnsHeader => {
      dispatch({
        type: 'GET_ALL_OPPORTUNITIES_COLUMNS_HEADER',
        payload: columnsHeader
      });
    })
    .catch(err => {
      console.error.bind(err);
    });
}

// export function getHiddenColumnsOfOpportunities(dispatch) {
//   const colPropsToIndicesBound = colPropsToIndices.bind(this);
//
//   axios.get('/api/opportunities/columns').then(response => {
//     const hiddenColIndices = colPropsToIndicesBound(response.data);
//     dispatch({
//       type: 'GET_HIDDENCOLUMNS_OF_OPPORTUNITIES',
//       payload: hiddenColIndices
//     });
//   });
// }

export function updateHiddenColumnsOfOpportunities(context) {
  return function(dispatch) {
    const getHiddenColsBound = getHiddenCols.bind(this);
    const hiddenColumns = getHiddenColsBound(context);
    axios.put('/api/opportunities/columns', { hiddenColumns }).then(() => {
      dispatch(getHiddenColumnsOfOpportunities.bind(this));
    });
  };
}

export function getAllOpportunityIDsNames() {
  return function(dispatch) {
    axios.get('/api/opportunities/names').then(res => {
      dispatch({
        type: 'GET_ALL_OPPORTUNITY_IDS_NAMES',
        payload: res
      });
    });
  };
}

export function relateOppToContact(changes, source, oppID) {
  return function(dispatch) {
    // get ID of the opportunity name that was selected
    if (changes) {
      const rowIndex = changes[0][0];
      const contactID = this.refs.hot.hotInstance.getSourceDataAtRow(rowIndex)
        .id;
      axios
        .get(`/api/opportunity/${oppID}/${contactID}`)
        .then(response => console.log(response));
    }
  };
}
