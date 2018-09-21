import { fromJS } from "immutable";

import {
  APP_LOADING,
  APP_ERROR,
  SET_DEFERRED_PROMPT,
  SET_META,
  SET_TITLE,
  SET_URL,
  ADD_APP_NOTIFICATION,
  DELETE_APP_NOTIFICATION,
  SET_RATES,
  SET_DATA_FETCHING_STATUS,
  SET_SEARCH,
  SET_SEARCH_FOCUS,
  SET_SEARCH_RESULTS,
  SET_SEARCH_RESULTS_LOADING_STATE,
  REDUCER_NAME
} from "./constants";

const initialState = fromJS({
  deferredPrompt: null,
  isLoading: false,
  isError: false,
  isSearchFocused: false,
  search: "",
  searchResults: [],
  rates: {
    SBD: 290.0,
    STEEM: 280.0,
    naira: 1
  },
  hasFetchedRates: false,
  isFetchingData: false,
  appNotifications: [],
  meta: {},
  title: "",
  url: ""
});

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case APP_LOADING:
      return state.set("isLoading", action.data);
    case APP_ERROR:
      return state.set("isError", true);
    case SET_DEFERRED_PROMPT:
      return state.set("deferredPrompt", action.data);
    case SET_META:
      return state.set("meta", action.data);
    case SET_TITLE:
      return state.set("title", action.data);
    case SET_URL:
      return state.set("url", action.data);
    case ADD_APP_NOTIFICATION:
      return state.set(
        "appNotifications",
        state.get("appNotifications").push(fromJS(action.data))
      );
    case DELETE_APP_NOTIFICATION:
      return state.updateIn(["appNotifications"], appNotifications =>
        fromJS(
          appNotifications.toJS().filter(appNotification => {
            return appNotification.message !== action.data.message;
          })
        )
      );

    case SET_RATES:
      return state.set("rates", action.data.rates);
    case SET_DATA_FETCHING_STATUS:
      return state.set("isFetchingData", action.data.isFetchingData);

    case SET_SEARCH:
      return state.set("search", action.data.search);
    case SET_SEARCH_FOCUS:
      return state.set("isSearchFocused", action.data.isSearchFocused);
    case SET_SEARCH_RESULTS:
      return state.set("searchResults", action.data.results);
    case SET_SEARCH_RESULTS_LOADING_STATE:
      return state.set(
        "isLoadingSearchResults",
        action.data.isLoadingSearchResults
      );

    default:
      return state;
  }
}

export function getAppState(state) {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
}
