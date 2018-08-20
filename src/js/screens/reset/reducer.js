import { fromJS } from "immutable";

import {
  SET_RECOVERY_EMAIL,
  SET_RECOVERY_NOTICE,
  SET_RESET_ATTEMPTING_STATUS,
  SET_RESET_MODAL_STATUS,
  REDUCER_NAME
} from "./constants";

const initialState = fromJS({
  title: "",
  html: "",
  isResetStatusModalOpen: false,
  isAttemptingReset: false,
  recoveryEmail: "",
  recoveryNotice: ""
});

export const resetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESET_MODAL_STATUS:
      return state.set(
        "isResetStatusModalOpen",
        action.data.isResetStatusModalOpen
      );
    case SET_RESET_ATTEMPTING_STATUS:
      return state.set("isAttemptingReset", action.data.isAttemptingReset);
    case SET_RECOVERY_EMAIL:
      return state.set("recoveryEmail", action.data.email);
    case SET_RECOVERY_NOTICE:
      return state.set("recoveryNotice", action.data.notice);
    default:
      return state;
  }
};

export const getResetState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
