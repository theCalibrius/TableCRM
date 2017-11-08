import axios from 'axios';

export function getContacts(dispatch) {
  axios
    .get('/api/contacts')
    .then(response => {
      //console.log(response);
      //console.log(new Date(response.data['createdDate']));
      dispatch({
        type: 'GET_ALL_CONTACTS',
        payload: response.data
      });
    })
    .catch(err => {
      console.error.bind(err);
    });
}

export function beforeRemoveContact(index, amount) {
  return function(dispatch) {
    console.log('index ->', index);
    console.log('amount ->', amount);
    // [startRow, startCol, endRow, endCol]
    console.log('selected ->', this.refs.hot.hotInstance.getSelected());
    // indexs
    const startRow = this.refs.hot.hotInstance.getSelected()[0];
    const endRow = this.refs.hot.hotInstance.getSelected()[2];
    // smallest and biggest index
    const smallestRowIndex = Math.min(startRow, endRow);
    const biggestRowIndex = Math.max(startRow, endRow);
    // get list of deleted index
    const removedIds = [];
    for (let i = smallestRowIndex; i <= biggestRowIndex; i++) {
      removedIds.push(this.refs.hot.hotInstance.getDataAtRow(i)[0]);
    }
    console.log(removedIds);
    axios({
      method: 'DELETE',
      url: '/api/contacts',
      data: {
        removedIds
      }
    });
  };
}