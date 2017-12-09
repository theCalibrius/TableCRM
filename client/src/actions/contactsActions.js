import axios from 'axios';
import {
  getNewAndUpdatedRows,
  getRemovedIds,
  getHiddenColsFromResponse,
  getSortedColumnsByRank
} from '../lib/helper';

export function getContacts(dispatch) {
  axios
    .get('/api/contacts')
    .then(response => {
      dispatch({
        type: 'GET_ALL_CONTACTS',
        payload: response.data
      });
    })
    .catch(err => {
      console.error.bind(err);
    });
}

export function createAndUpdateContacts(changes, source) {
  return function(dispatch) {
    const getNewAndUpdatedRowsBound = getNewAndUpdatedRows.bind(this);
    const newAndUpdatedRows = getNewAndUpdatedRowsBound(changes, source);
    console.log(changes);
    if (newAndUpdatedRows) {
      const newRows = newAndUpdatedRows.newRows;
      const updatedRows = newAndUpdatedRows.updatedRows;

      if (newRows.length > 0) {
        axios.post('/api/contacts', { newRows }).then(() => {
          dispatch(getContacts);
        });
      }

      if (updatedRows.length > 0) {
        axios.put('/api/contacts', { updatedRows }).then(() => {
          dispatch(getContacts);
        });
      }
    }
  };
}

export function deleteContacts(index, amount) {
  return function(dispatch) {
    // get deleted row ID(s)
    const getRemovedIdsBound = getRemovedIds.bind(this);
    const removedIds = getRemovedIdsBound();
    axios({
      method: 'DELETE',
      url: '/api/contacts',
      data: {
        removedIds
      }
    });
  };
}

export function getColumnsOfContacts(dispatch) {
  axios
    .get('/api/contacts/columns')
    .then(response => {
      const hiddenColumnsIndexes = getHiddenColsFromResponse(response);
      dispatch({
        type: 'GET_CONTACTS_HIDDENCOLUMNS',
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
        type: 'GET_ALL_CONTACTS_COLUMNS_HEADER',
        payload: columnsHeader
      });
    })
    .catch(err => {
      console.error.bind(err);
    });
}

export function updateSource() {
  const columns = this.state.columns;
  for (const column of columns) {
    if (column.data === 'name') {
      column.source = this.props.opportunityIDsNames.map(i => i.name);
    }
  }
  this.forceUpdate();
}
