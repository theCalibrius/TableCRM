import axios from 'axios';

export function getAccounts(e) {
  return function(dispatch) {
    axios
      .get('/api/accounts')
      .then(response => {
        console.log(response);
        dispatch({
          type: 'GET_ALL_ACCOUNTS',
          payload: response.data
        });
      })
      .catch(err => {
        console.error.bind(err);
      });
  };
}