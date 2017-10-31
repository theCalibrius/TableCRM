import axios from 'axios';

export function getLeads(e) {
  return function(dispatch) {
    axios
      .get(`/api/leads`)
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
  };
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
      let changedRows = {};
      for (let i of change) {
        changedRows[i[0]] = true;
      }
      const changedRowsArray = Object.keys(changedRows);

      let newRows = [];
      let existingRows = [];

      for (let i of changedRowsArray) {
        let rowData = this.refs.hot.hotInstance.getSourceDataAtRow(i);
        if (rowData.id === null) newRows.push(rowData);
        else existingRows.push(rowData);
      }

      // console.log(newRows);
      // console.log(existingRows);

      if (newRows.length !== 0) {
        axios.post('/api/leads', {
          newRows: newRows
        });
      }

      if (existingRows.length !== 0) {
        axios.put('/api/leads', {
          existingRows: existingRows
        });
      }
    }
  };
}
