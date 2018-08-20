import { fromJS } from "immutable";

import {
  APP_LOADING,
  APP_ERROR,
  SET_DEFERRED_PROMPT,
  SET_META,
  SET_TITLE,
  SET_URL,
  SET_RATES,
  SET_DATA_FETCHING_STATUS,
  REDUCER_NAME
} from "./constants";

const initialState = fromJS({
  deferredPrompt: null,
  isLoading: false,
  isError: false,
  rates: {},
  hasFetchedRates: false,
  isFetchingData: true,
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
    case SET_RATES:
      return state.set("rates", action.data.rates);
    case SET_DATA_FETCHING_STATUS:
      return state.set("isFetchingData", action.data.isFetchingData);
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
