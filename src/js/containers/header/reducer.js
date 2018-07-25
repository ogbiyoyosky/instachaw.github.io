import { fromJS } from "immutable";

import {
  SET_NAV_ITEM_ACTIVE,
  SET_MENU_OPEN_STATE,
  SET_ACCOUNT_MENU_OPEN_STATE,
  SET_HEADER,
  SET_HEADER_VISIBILITY,
  REDUCER_NAME
} from "./constants";

const initialState = fromJS({
  nav: {
    name: "",
    url: "",
    icon: "",
    isActive: false,
    children: []
  },
  isMenuOpen: false,
  isAccountMenuOpen: false,
  isHeaderVisible: true
});

export function headerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NAV_ITEM_ACTIVE:
      if (action.data.href === "/") {
        // home page
        return state
          .setIn(["nav", "isActive"], true)
          .updateIn(["nav", "children"], n =>
            n.map(m => m.set("isActive", false))
          );
      }
      return state
        .setIn(["nav", "isActive"], false)
        .updateIn(["nav", "children"], n =>
          n.map(m => m.set("isActive", m.get("url") === action.data.href))
        );
    case SET_HEADER:
      return state.set("nav", action.data);
    case SET_HEADER_VISIBILITY:
      return state.set("isHeaderVisible", action.data.isHeaderVisible);
    case SET_MENU_OPEN_STATE:
      return state.set("isMenuOpen", action.data.isMenuOpen);
    case SET_ACCOUNT_MENU_OPEN_STATE:
      return state.set("isAccountMenuOpen", action.data.isAccountMenuOpen);
    default:
      return state;
  }
}

export const getHeaderState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
