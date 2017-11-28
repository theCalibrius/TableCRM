import axios from 'axios';

export function getTotalOppValuePerStatus(dispatch) {
  axios.get('/api/dashboard/totaloppvalueperstatus').then(response => {
    dispatch({
      type: 'GET_TOTAL_OPP_VALUE_PER_STATUS',
      payload: response.data
    });
  });
  // .catch(err => {
  //   console.error.bind(err);
  // });
}
