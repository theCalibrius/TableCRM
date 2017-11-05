import axios from 'axios';

export function getLeads(dispatch) {
  axios
    .get('/api/leads')
    .then(response => {
      console.log(response.data);
      dispatch({
        type: 'GET_ALL_LEADS',
        payload: response.data
      });
    })
    .catch(err => {
      console.error.bind(err);
    });
}

export function afterChange(change, source) {
  // changes contains [row, prop, oldVal, newVal]
  return function(dispatch) {
    if (change !== null) {
      // remove row from change if old√al and newVal are false value
      for (let i = 0; i < change.length; i++) {
        if (!change[i][2] && !change[i][3]) {
          change.splice(i, 1);
        }
      }
      // get changed rows as array
      const changedRows = {};
      for (const i of change) {
        changedRows[i[0]] = true;
      }
      const changedRowsArray = Object.keys(changedRows);

      const newRows = [];
      const existingRows = [];

      for (const i of changedRowsArray) {
        const rowData = this.refs.hot.hotInstance.getSourceDataAtRow(i);
        if (rowData.id === null) newRows.push(rowData);
        else existingRows.push(rowData);
      }

      if (newRows.length !== 0) {
        axios
          .post('/api/leads', {
            newRows
          })
          .then(() => {
            this.props.dispatch(getLeads);
          });
      }

      if (existingRows.length !== 0) {
        axios.put('/api/leads', {
          existingRows
        });
      }
    }
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
