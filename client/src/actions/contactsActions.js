import axios from 'axios';

export function getContacts(dispatch) {
  // return function(dispatch) {
  axios
    .get('/api/contacts')
    .then(response => {
      console.log(response);
      dispatch({
        type: 'GET_ALL_CONTACTS',
        payload: response.data
      });
    })
    .catch(err => {
      console.error.bind(err);
    });
  // };
}
