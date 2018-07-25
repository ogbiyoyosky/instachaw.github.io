import { fromJS } from "immutable";

import { REDUCER_NAME } from "./constants";

const initialState = fromJS({
  title: "",
  html: ""
});

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
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
