import {
  SET_NAV_ITEM_ACTIVE,
  SET_ACCOUNT_MENU_OPEN_STATE,
  SET_MENU_OPEN_STATE,
  SET_HEADER,
  SET_HEADER_VISIBILITY
} from "./constants";
import { getHeaderData } from "../../../../service/service";

export const setHeaderVisibility = data => {
  return {
    type: SET_HEADER_VISIBILITY,
    data
  };
};

export const setAccountMenuOpenState = data => {
  return {
    type: SET_ACCOUNT_MENU_OPEN_STATE,
    data
  };
};

export const setMenuOpenState = data => {
  return {
    type: SET_MENU_OPEN_STATE,
    data
  };
};

export const setNavItemActive = data => {
  return {
    type: SET_NAV_ITEM_ACTIVE,
    data
  };
};

const loadHeader = data => {
  return {
    type: SET_HEADER,
    data
  };
};

export const fetchHeader = data => {
  return dispatch => {
    return getHeaderData(data)
      .then(response => {
        dispatch(loadHeader(response));
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  };
};
