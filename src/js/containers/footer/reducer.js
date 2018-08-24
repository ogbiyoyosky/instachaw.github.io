import { fromJS } from "immutable";

import {
  REDUCER_NAME,
  SET_DOCK_ITEM_ACTIVE,
  SET_FOOTER_VISIBILITY
} from "./constants";

const initialState = fromJS({
  activeDockItem: "home",
  isFooterVisible: true
});

export function footerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DOCK_ITEM_ACTIVE:
      return state.set("activeDockItem", action.data.path);
    case SET_FOOTER_VISIBILITY:
      return state.set("isFooterVisible", action.data.isFooterVisible);
    default:
      return state;
  }
}

export const getFooterState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
