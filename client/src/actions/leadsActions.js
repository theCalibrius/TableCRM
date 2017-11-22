import axios from 'axios';
import moment from 'moment';
import {
  getNewAndUpdatedRows,
  getRemovedIds,
  getMovedColumnRange,
  entityColumnsToObj,
  getChangedColumnsObj
} from '../lib/helper';

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
  };
}

export function deleteLeads(index, amount) {
  return function(dispatch) {
    const selectedRows = this.refs.hot.hotInstance.getSelected();
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

export function getEntityColumnOrders(dispatch) {
  axios
    .get('/api/leads/columnorders')
    .then(response => {
      const columnsOrder = [];
      const columns = response.data;
      for (const column of columns) {
        columnsOrder.push(column.rank);
      }
      console.log(columnsOrder);
      const columnsHeader = [];
      const columnsCopy = columns.slice(0);
      columnsCopy.sort((a, b) => a.rank - b.rank);
      for (const column of columnsCopy) {
        columnsHeader.push(column.name);
      }
      console.log(columnsHeader);
      return [columnsHeader, columnsOrder];
    })
    .then(response => {
      dispatch({
        type: 'GET_ALL_LEADS_COLUMNS_HEADER',
        payload: response[0]
      });
      dispatch({
        type: 'GET_ALL_LEADS_COLUMNS',
        payload: response[1]
      });
    })
    .catch(err => {
      console.error.bind(err);
    });
}

export function updateEntityColumnOrders(columns, target) {
  return function(dispatch) {
    if (target) {
      const afterColumnsArray = this.refs.hot.hotInstance.getColHeader();
      getMovedColumnRange(columns, target).then(movedRange => {
        entityColumnsToObj()
          .then(entityColumnsObj => [entityColumnsObj, movedRange])
          .then(res => {
            const entityColumnsObj = res[0];
            const movedRange = res[1];
            getChangedColumnsObj(
              entityColumnsObj,
              movedRange,
              afterColumnsArray
            ).then(updatedColumnOrders => {
              console.log(updatedColumnOrders);
              axios
                .put('/api/leads/columnorders', { updatedColumnOrders })
                .then(dispatch(getEntityColumnOrders));
            });
          });
      });
    }
  };
}
