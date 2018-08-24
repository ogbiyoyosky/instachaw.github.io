import { fromJS } from "immutable";

import {
  SET_TREATS,
  SET_TREATS_COUNT,
  SET_TREAT_PAGE,
  SET_CURRENT_TREATS_PAGE,
  SET_TREATS_LOADING_STATUS,
  SET_TREAT,
  SET_ACTIVE_TREAT,
  REDUCER_NAME
} from "./constants";

const initialState = fromJS({
  title: "",
  html: "",
  treats: [],
  treatsCount: 0,
  activeTreat: {},
  currentTreatPage: 1,
  isLoadingTreats: true
});

export const treatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TREAT_PAGE:
      return state
        .set("title", action.data.title)
        .set("html", action.data.html);

    case SET_TREATS:
      return state.set("treats", state.get("treats").push(...action.data));
    case SET_TREATS_COUNT:
      return state.set("treatsCount", action.data.treatsCount);
    case SET_CURRENT_TREATS_PAGE:
      return state.set("currentTreatPage", action.data.currentTreatPage);
    case SET_TREATS_LOADING_STATUS:
      return state.set("isLoadingTreats", action.data.isLoadingTreats);
    case SET_TREAT:
      return state.set("treats", state.get("treats").push(action.data));
    case SET_ACTIVE_TREAT:
      return state.set("activeTreat", action.data.treat);
    default:
      return state;
  }
};

export const getTreatState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
