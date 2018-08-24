import { fromJS } from "immutable";

import {
  SET_LOGGED_IN_STATUS,
  SET_LOGIN_ATTEMPTING_STATUS,
  REDUCER_NAME
} from "./constants";

const initialState = fromJS({
  title: "",
  html: "",
  isLoggedIn: false,
  isAttemptingLogin: false
});

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_ATTEMPTING_STATUS:
      return state.set("isAttemptingLogin", action.data.isAttemptingLogin);
    case SET_LOGGED_IN_STATUS:
      return state.set("isLoggedIn", action.data.isLoggedIn);
    default:
      return state;
  }
};

export const getLoginState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
