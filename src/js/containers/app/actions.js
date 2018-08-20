import {
  APP_LOADING,
  APP_ERROR,
  SET_DEFERRED_PROMPT,
  SET_META,
  SET_TITLE,
  SET_URL,
  SET_RATES,
  SET_RATES_FETCHED_STATUS,
  SET_DATA_FETCHING_STATUS
} from "./constants";

import { sendRequest } from "../../services/ApiService";

export const isLoading = data => {
  return {
    type: APP_LOADING,
    data
  };
};

export const isError = data => {
  return {
    type: APP_ERROR
  };
};

export const setDeferredPrompt = data => {
  return {
    type: SET_DEFERRED_PROMPT,
    data
  };
};

export const setTitle = data => {
  return {
    type: SET_TITLE,
    data
  };
};

export const setUrl = data => {
  return {
    type: SET_URL,
    data
  };
};

export const setMeta = data => {
  return {
    type: SET_META,
    data
  };
};

export const setRates = data => {
  return {
    type: SET_RATES,
    data
  };
};

export const setRatesFetchedStatus = data => {
  return {
    type: SET_RATES_FETCHED_STATUS,
    data
  };
};

export const setDataFetchingStatus = data => {
  return {
    type: SET_DATA_FETCHING_STATUS,
    data
  };
};

export const fetchRates = () => {
  return dispatch => {
    dispatch(
      setDataFetchingStatus({
        isFetchingData: true
      })
    );

    sendRequest({
      endpoint: "http://localhost:3333/api/v1/rates",
      method: "GET"
    })
      .then(response => {
        if (typeof response !== "undefined" && typeof response !== null) {
          dispatch(
            setRates({
              rates: response
            })
          );
          dispatch(
            setRatesFetchedStatus({
              hasFetchedRates: true
            })
          );
          dispatch(
            setDataFetchingStatus({
              isFetchingData: false
            })
          );
        }
      })
      .catch(e => console.log(e));
  };
};
