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
  currentTreatPage: {},
  isLoadingTreats: false
});

export const treatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TREAT_PAGE:
      return state
        .set("title", action.data.title)
        .set("html", action.data.html);

    case SET_TREATS:
      let treats = state.get("treats").toJS();

      let loadedStoreItems = treats.filter(
        treatSet => Number(treatSet.store_id) === Number(action.store_id)
      );

      if (loadedStoreItems.length > 0) {
        return state.set(
          "treats",
          state
            .get("treats")
            .filter(
              treatSet => Number(treatSet.store_id) !== Number(action.store_id)
            )
            .push({
              store_id: action.store_id,
              items: [...loadedStoreItems[0].items, ...action.data]
            })
        );
      }

      return state.set(
        "treats",
        state.get("treats").push({
          store_id: action.store_id,
          items: action.data
        })
      );
    case SET_TREATS_COUNT:
      return state.set("treatsCount", action.data.treatsCount);
    case SET_CURRENT_TREATS_PAGE:
      return state.setIn(
        ["currentTreatPage", action.data.store_id],
        action.data.currentTreatPage
      );
    case SET_TREATS_LOADING_STATUS:
      return state.set("isLoadingTreats", action.data.isLoadingTreats);
    case SET_TREAT:
      return state.set(
        "treats",
        state.get("treats").push({
          store_id: action.store_id,
          items: action.data
        })
      );
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
