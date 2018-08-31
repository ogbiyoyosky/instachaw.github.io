import { fromJS } from "immutable";

import {
  SET_HOME,
  SET_SEARCH,
  SET_HOME_FEED_LOADING_STATE,
  SET_FETCHED_HOME_FEED_STATE,
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
  hasFetchedHomeFeed: false,
  isLoadingSearchResults: false
});

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOME:
      return state
        .set("title", action.data.title)
        .set("html", action.data.html)
        .set("buttons", action.data.buttons);
    case SET_HOME_FEED_LOADING_STATE:
      return state.set("isHomeFeedLoading", action.data.isHomeFeedLoading);
    case SET_FETCHED_HOME_FEED_STATE:
      return state.set("hasFetchedHomeFeed", action.data.hasFetchedHomeFeed);
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
