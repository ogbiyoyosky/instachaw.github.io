import { fromJS } from "immutable";

import { REDUCER_NAME, SET_REGISTRATION_ATTEMPTING_STATUS } from "./constants";

const initialState = fromJS({
  title: "",
  html: "",
  isAttemptingRegistration: false
});

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGISTRATION_ATTEMPTING_STATUS:
      return state.set(
        "isAttemptingRegistration",
        action.data.isAttemptingRegistration
      );
    default:
      return state;
  }
};

export const getRegisterState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
