import axios from 'axios';

export function getOpportunities(e) {
  return function(dispatch) {
    axios
      .get('/api/opportunities')
      .then(response => {
        console.log(response);
        dispatch({
          type: 'GET_ALL_OPPORTUNITIES',
          payload: response.data
        });
      })
      .catch(err => {
        console.error.bind(err);
      });
  };
}
