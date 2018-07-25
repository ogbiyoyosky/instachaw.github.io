import { TREATS_ENDPOINT, SET_TREATS } from "./constants";
import { getTreatsData } from "../../../../service/service";

const setTreats = data => {
  return {
    type: SET_TREATS,
    data
  };
};

export const fetchTreats = (
  payload,
  endpoint = TREATS_ENDPOINT
) => dispatch => {
  // fetch(`${window.location.hostname}/${endpoint}`, {
  //     method: 'get',
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //         ...payload
  //     })
  // }).then(response => {
  //     if (response.status >= 200 && response.status < 300) {
  //         dispatch(handleSuccess(response))
  //     } else {
  //         let Error = new Error(response.statusText)
  //         error.response = response;
  //         dispatch(handleError(error))
  //     }
  // }).catch(error => {console.log('request failed', error)})
  getTreatsData().then(response => {
    dispatch(setTreats(response));
  });
};
