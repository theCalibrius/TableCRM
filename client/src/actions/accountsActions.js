/*
Actions, and action creators, are used for changing application state.
An action creator is a function that returns an object (an action)
the action has a 'type' that describes the type of action that was just triggered
that action is then automatically sent to all reducers within the application

below, the function getAccounts is an action creator.

it's customary for redux action types to be all upper-case with words separated by
underscores (snake-casing), like GET_ALL_ACCOUNTS below

*/

import axios from 'axios';
import moment from 'moment';

import {
  getNewAndUpdatedRows,
  getRemovedIds,
  getHiddenColsFromResponse,
  getSortedColumnsByRank,
  getHiddenColsFromContext,
  getMovedColumnsIndexRange,
  mapColumnIdToName,
  getUpdatedColumnsObj
} from '../lib/helper';

export function getAllAccounts(dispatch) {
  axios
    .get('/api/accounts')
    .then(response => {
      for (const row of response.data) {
        if (row.createdAt) {
          row.createdAt = moment(new Date(row.createdAt)).format('MM/DD/YYYY');
        }
      }
      return response;
    })
    .then(response => {
      dispatch({
        type: 'GET_ALL_ACCOUNTS',
        payload: response.data
      });
    })
    .catch(err => {
      console.error.bind(err);
    });
}

export function createAndUpdateAccounts(changes, source) {
  return function(dispatch) {
    const getNewAndUpdatedRowsBound = getNewAndUpdatedRows.bind(this);
    const newAndUpdatedRows = getNewAndUpdatedRowsBound(changes, source);

    if (newAndUpdatedRows) {
      const newRows = newAndUpdatedRows.newRows;
      const updatedRows = newAndUpdatedRows.updatedRows;

      if (newRows.length > 0) {
        console.log('THIS IS A POST method, meaning CREATE');
        axios.post('/api/accounts', { newRows }).then(() => {
          dispatch(getAllAccounts);
        });
      }

      if (updatedRows.length > 0) {
        console.log('THIS IS A PUT method, meaning UPDATE');
        axios.put('/api/accounts', { updatedRows });
      }
    }
  };
}

export function deleteAccounts(index, amount) {
  return function(dispatch) {
    const getRemovedIdsBound = getRemovedIds.bind(this);
    const removedIds = getRemovedIdsBound();
    console.log('deleteAccounts, removeIds Object: ', removedIds);
    axios({
      method: 'DELETE',
      url: '/api/accounts',
      data: { removedIds }
    });
  };
}

export function getColumnsOfAccounts(dispatch) {
  axios
    .get('/api/accounts/columns')
    .then(response => {
      const hiddenColumnsIndexes = getHiddenColsFromResponse(response);
      dispatch({
        type: 'GET_ACCOUNTS_HIDDENCOLUMNS',
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
        type: 'GET_ALL_ACCOUNTS_COLUMNS_HEADER',
        payload: columnsHeader
      });
    })
    .catch(err => {
      console.error.bind(err);
    });
}

export function updateHiddenColumnsOfAccounts(context) {
  return function(dispatch) {
    const getHiddenColsBound = getHiddenColsFromContext.bind(this);
    const hiddenColumns = getHiddenColsBound(context);
    axios.put('/api/accounts/columns/hidden', { hiddenColumns }).then(() => {
      dispatch(getColumnsOfAccounts.bind(this));
    });
  };
}

export function updateColumnOrderOfAccounts(columns, target) {
  return function(dispatch) {
    if (target) {
      getMovedColumnsIndexRange(columns, target).then(movedRange => {
        const mapColumnIdToNameBind = mapColumnIdToName.bind(this);
        mapColumnIdToNameBind()
          .then(ColumnIdToNameObj => [ColumnIdToNameObj, movedRange])
          .then(resArray => {
            const ColumnIdToNameObj = resArray[0];
            const movedRangeIndexes = resArray[1];
            const afterColumnsArray = this.refs.hot.hotInstance.getColHeader();
            getUpdatedColumnsObj(
              ColumnIdToNameObj,
              movedRangeIndexes,
              afterColumnsArray
            ).then(updatedColumnOrders => {
              axios
                .put('/api/accounts/columns/order', { updatedColumnOrders })
                .then(dispatch(getColumnsOfAccounts));
            });
          });
      });
    }
  };
}
