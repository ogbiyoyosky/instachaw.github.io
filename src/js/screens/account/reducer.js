import { fromJS } from "immutable";

import {
  ADD_USER_ORDER,
  SET_ORDERS,
  SET_USER,
  SET_TRANSACTIONS_COUNT,
  SET_FUNDING_MODAL_STATUS,
  SET_FUNDING_AMOUNT,
  SET_FUNDING_METHOD,
  SET_FUNDING_ATTEMPTING_STATUS,
  SET_STEEMIT_USERNAME,
  SET_ACCOUNT,
  REDUCER_NAME
} from "./constants";

const initialState = fromJS({
  title: "",
  html: "",
  isFundingModalOpen: false,
  fundingAmount: 1000,
  fundingMethod: "naira",
  isAttemptingFunding: false,
  orders: [],
  transactionsCount: 0,
  wallets: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).wallets
    : [],

  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null
});

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCOUNT:
      return state
        .set("title", action.data.title)
        .set("html", action.data.html);
    case ADD_USER_ORDER:
      return state.set(
        "orders",
        state.get("orders").push(fromJS(action.data.order))
      );

    case SET_USER:
      return state.set("user", action.data.user);

    case SET_TRANSACTIONS_COUNT:
      return state.set("transactionsCount", action.data.transactionsCount);

    case SET_ORDERS:
      return state.set("orders", action.data.orders);

    case SET_FUNDING_MODAL_STATUS:
      return state.set("isFundingModalOpen", action.data.isFundingModalOpen);

    case SET_STEEMIT_USERNAME:
      return state.set("steemitUsername", action.data.steemitUsername);

    case SET_FUNDING_AMOUNT:
      return state.set("fundingAmount", action.data.fundingAmount);

    case SET_FUNDING_METHOD:
      return state.set("fundingMethod", action.data.fundingMethod);

    case SET_FUNDING_ATTEMPTING_STATUS:
      return state.set("isAttemptingFunding", action.data.isAttemptingFunding);

    default:
      return state;
  }
};

export const getAccountState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
