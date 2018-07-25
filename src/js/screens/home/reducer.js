import { fromJS } from "immutable";

import {
  SET_HOME,
  SET_SEARCH,
  SET_SEARCH_FOCUS,
  SET_SEARCH_RESULTS,
  SET_HOME_FEED_LOADING_STATE,
  SET_SEARCH_RESULTS_LOADING_STATE,
  REDUCER_NAME
} from "./constants";

const initialState = fromJS({
  title: "",
  html: "",
  buttons: [],
  isSearchFocused: false,
  searchResults: [],
  search: "",
  isHomeFeedLoading: true,
  isLoadingSearchResults: false
});

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOME:
      return state
        .set("title", action.data.title)
        .set("html", action.data.html)
        .set("buttons", action.data.buttons);
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
    case SET_HOME_FEED_LOADING_STATE:
      return state.set("isHomeFeedLoading", action.data.isHomeFeedLoading);
    default:
      return state;
  }
};

export const getHomeState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
