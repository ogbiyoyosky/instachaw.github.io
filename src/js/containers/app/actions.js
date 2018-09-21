import {
  APP_LOADING,
  APP_ERROR,
  ADD_APP_NOTIFICATION,
  DELETE_APP_NOTIFICATION,
  SET_DEFERRED_PROMPT,
  SET_META,
  SET_TITLE,
  SET_URL,
  SET_RATES,
  SET_RATES_FETCHED_STATUS,
  SET_DATA_FETCHING_STATUS,
  SET_SEARCH,
  SET_SEARCH_FOCUS,
  SET_SEARCH_RESULTS,
  SET_SEARCH_RESULTS_LOADING_STATE
} from "./constants";

import { sendRequest } from "../../services/ApiService";

const HOST_URL =
  window.location.origin === "https://instachaw.com"
    ? "https://api.instachaw.com"
    : "http://localhost:3333";

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

export const addAppNotification = data => {
  return {
    type: ADD_APP_NOTIFICATION,
    data
  };
};

export const deleteAppNotification = data => {
  return {
    type: DELETE_APP_NOTIFICATION,
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
    let endpoint = `api/v1/rates`;
    // dispatch(
    //   setDataFetchingStatus({
    //     isFetchingData: true
    //   })
    // );

    sendRequest({
      endpoint: `${HOST_URL}/${endpoint}`,
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
          // dispatch(
          //   setDataFetchingStatus({
          //     isFetchingData: false
          //   })
          // );
        }
      })
      .catch(e => console.log(e));
  };
};

export const setSearch = data => {
  return {
    type: SET_SEARCH,
    data
  };
};

const setSearchResults = data => {
  return {
    type: SET_SEARCH_RESULTS,
    data
  };
};

export const setSearchResultsLoadingState = data => {
  return {
    type: SET_SEARCH_RESULTS_LOADING_STATE,
    data
  };
};

export const attemptSearchQuery = data => {
  let endpoint = `api/v1/items?search=${data["search"]}`;
  return dispatch => {
    sendRequest({
      endpoint: `${HOST_URL}/${endpoint}`,
      method: "GET"
    })
      .then(response => {
        if (typeof response !== "undefined" && typeof response !== null) {
          dispatch(
            setSearchResults({
              results: response
            })
          );
          dispatch(
            setSearchResultsLoadingState({
              isLoadingSearchResults: false
            })
          );
        }
      })
      .catch(e => console.log(e));
  };
};

export const toggleSearchFocus = data => {
  return {
    type: SET_SEARCH_FOCUS,
    data
  };
};
