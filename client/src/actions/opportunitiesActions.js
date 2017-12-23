import axios from 'axios';

import {
  getNewAndUpdatedRows,
  getRemovedIds,
  getHiddenCols,
  colPropsToIndices,
  buildObjToAssignOpportunityToContact
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
  const request = axios.get('/api/opportunities/names');
  return {
    type: 'GET_ALL_OPPORTUNITY_IDS_NAMES',
    payload: request
  };
}

export function getCopiedOpportunities(opportunityIDs) {
  return {
    type: 'GET_COPIED_OPPORTUNITIES',
    payload: opportunityIDs
  };
}

export function handleRelateOppsToContacts(changes, opportunityIDs,opportunityIDsNames) {
  return function(dispatch) {
    this.props.dispatch(relateOppToContact(changes, opportunityIDs,opportunityIDsNames).bind(this));
  }
}

export function handleRelateOppToContact(changes,opportunityIDsNames) {
  return function(dispatch) {
    //handle dropdown select and assign to a single contact
    const selectedOpportunityName = changes[0][3];
    const oppIDs = opportunityIDsNames.filter(({name}) => name === selectedOpportunityName).map(({id}) => id);
    if (changes[0][1] === 'name'  && (opportunityIDsNames.find(o => o.name === selectedOpportunityName) || selectedOpportunityName === ""))  {
        this.props.dispatch(relateOppToContact(changes, oppIDs,opportunityIDsNames).bind(this));
    }

  };
}
export function relateOppToContact(changes,opportunityIDs,opportunityIDsNames) {
  return function(dispatch) {
    if (changes) {
      // if changing multiple rows
      if (changes.length > 1) {
        const bound = buildObjToAssignOpportunityToContact.bind(this);
        const data = bound(changes,opportunityIDs,opportunityIDsNames);
        axios.post('/api/opportunity/contact', data );
      }
      // if changing one row
      else {
        if (opportunityIDs) {
          const oppID = opportunityIDs[0];
          const rowIndex = changes[0][0];
          const contactID = this.refs.hot.hotInstance.getSourceDataAtRow(rowIndex).id;
          axios.post('/api/opportunity/contact', {oppID: oppID, contactID: contactID} );
        }
      }
    }
  };
}