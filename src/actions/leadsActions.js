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
