import axios from 'axios';

import {
  getNewAndUpdatedRows,
  getRemovedIds,
  getHiddenColsFromContext,
  colPropsToIndices
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

export function getHiddenColumnsOfOpportunities(dispatch) {
  const colPropsToIndicesBound = colPropsToIndices.bind(this);

  axios.get('/api/opportunities/columns').then(response => {
    const hiddenColIndices = colPropsToIndicesBound(response.data);
    dispatch({
      type: 'GET_HIDDENCOLUMNS_OF_OPPORTUNITIES',
      payload: hiddenColIndices
    });
  });
}

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
    axios
      .get('/api/opportunities/names')
      .then(res => {
        dispatch({
          type: 'GET_ALL_OPPORTUNITY_IDS_NAMES',
          payload: res
        });
        return res;
      })
      .then(res => {
        const oppNameIds = res.data;
        const oppName = oppNameIds.map(i => i.name);
        console.log(oppName);
        dispatch({
          type: 'GET_ALL_OPPORTUNITY_NAMES',
          payload: res.data
        });
      });
  };
  // const request = axios.get('/api/opportunities/names');
  // return {
  //   type: 'GET_ALL_OPPORTUNITY_IDS_NAMES',
  //   payload: request
  // };
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
