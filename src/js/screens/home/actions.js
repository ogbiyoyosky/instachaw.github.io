import {
  SET_HOME,
  SET_SEARCH,
  SET_SEARCH_FOCUS,
  SET_SEARCH_RESULTS,
  SET_SEARCH_RESULTS_LOADING_STATE,
  SET_FETCHED_HOME_FEED_STATE
} from "./constants";
import {
  isLoading,
  setMeta,
  setTitle,
  setUrl
} from "../../containers/app/actions";
import { getPageData } from "../../../../service/service";
import { sendRequest } from "../../services/ApiService";

const HOST_URL =
  window.location.origin === "https://instachaw.com"
    ? "https://api.instachaw.com"
    : "http://localhost:3333";

export const setSearch = data => {
  return {
    type: SET_SEARCH,
    data
  };
};

export const toggleSearchFocus = data => {
  return {
    type: SET_SEARCH_FOCUS,
    data
  };
};

const loadHome = data => {
  return {
    type: SET_HOME,
    data
  };
};

const setSearchResults = data => {
  return {
    type: SET_SEARCH_RESULTS,
    data
  };
};

export const setFetchedHomeFeedState = data => {
  return {
    type: SET_FETCHED_HOME_FEED_STATE,
    data
  };
};

export const setSearchResultsLoadingState = data => {
  return {
    type: SET_SEARCH_RESULTS_LOADING_STATE,
    data
  };
};

export const fetchHome = data => {
  return dispatch => {
    dispatch(isLoading(true));

    return getPageData(data)
      .then(response => {
        dispatch(setMeta(response.meta));
        dispatch(setUrl(response.url));
        dispatch(setTitle(response.title));
        return response;
      })
      .then(response => {
        dispatch(isLoading(false));
        dispatch(loadHome(response));
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
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
