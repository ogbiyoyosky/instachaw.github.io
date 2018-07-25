import { fromJS } from "immutable";

import {
  ADD_USER_ORDER,
  SET_ORDERS,
  SET_USER,
  SET_PAYMENT_MODAL_STATUS,
  SET_PAYMENT_AMOUNT,
  SET_STEEMIT_USERNAME,
  SET_ACCOUNT,
  REDUCER_NAME
} from "./constants";

const initialState = fromJS({
  title: "",
  html: "",
  isPaymentModalOpen: false,
  paymentAmount: 20,
  orders: [],
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

    case SET_ORDERS:
      return state.set("orders", action.data.orders);

    case SET_PAYMENT_MODAL_STATUS:
      return state.set("isPaymentModalOpen", action.data.isPaymentModalOpen);

    case SET_STEEMIT_USERNAME:
      return state.set("steemitUsername", action.data.steemitUsername);

    case SET_PAYMENT_AMOUNT:
      return state.set("paymentAmount", action.data.paymentAmount);

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
