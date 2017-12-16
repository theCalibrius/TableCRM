import axios from 'axios';
import moment from 'moment';
import {
  getNewAndUpdatedRows,
  getRemovedIds,
  getSortedColumnsByRank,
  getMovedColumnsIndexRange,
  mapColumnIdToName,
  getUpdatedColumnsObj
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
    const getNewAndUpdatedRowsBound = getNewAndUpdatedRows.bind(this);
    const newAndUpdatedRows = getNewAndUpdatedRowsBound(changes, source);

    if (newAndUpdatedRows) {
      const newRows = newAndUpdatedRows.newRows;
      const updatedRows = newAndUpdatedRows.updatedRows;

      if (newRows.length > 0) {
        axios.post('/api/leads', { newRows }).then(() => {
          dispatch(getAllLeads);
        });
      }

      if (updatedRows.length > 0) {
        axios.put('/api/leads', { updatedRows }).then(() => {
          dispatch(getAllLeads);
        });
      }
    }
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

export function getColumnsOfLeads(dispatch) {
  axios
    .get('/api/leads/columns')
    .then(response => {
      const columns = response.data;
      const getSortedColumnsByRankBind = getSortedColumnsByRank.bind(this);
      return getSortedColumnsByRankBind(columns);
    })
    .then(columnsHeader => {
      dispatch({
        type: 'GET_ALL_LEADS_COLUMNS_HEADER',
        payload: columnsHeader
      });
    })
    .catch(err => {
      console.error.bind(err);
    });
}

export function updateColumnsOfLeads(columns, target) {
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
                .put('/api/leads/columns', { updatedColumnOrders })
                .then(dispatch(getColumnsOfLeads));
            });
          });
      });
    }
  };
}

export function clickedDetailButton(event, coords, td) {
  return function(dispatch) {
    const rowIndex = coords.row;
    const rowData = this.refs.hot.hotInstance.getDataAtRow(rowIndex);
    const rowId = rowData[0];
    dispatch(getLeadById(rowId));
  };
}

export function getLeadById(id) {
  return function(dispatch) {
    axios
      .get('/api/lead', { params: { id } })
      .then(response => {
        const returnedEntity = response.data[0];
        return returnedEntity;
      })
      .then(returnedEntity => {
        dispatch({
          type: 'GET_LEAD_BY_ID',
          payload: returnedEntity
        });
      })
      .catch(err => {
        console.error.bind(err);
      });
  };
}
