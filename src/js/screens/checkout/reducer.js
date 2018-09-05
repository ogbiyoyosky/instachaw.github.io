import { fromJS } from "immutable";

import {
  SET_CHECKOUT,
  SET_CHECKOUT_STATUS,
  SET_CHECKOUT_ATTEMPTING_STATUS,
  SET_PAYMENT_METHOD,
  SET_PAYMENT_MODE,
  SET_DELIVERY_ADDRESS,
  REDUCER_NAME
} from "./constants";

const initialState = fromJS({
  title: "",
  html: "",
  isAttemptingCheckout: false,
  isCheckoutStatusModalOpen: false,
  deliveryAddress:
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user")).addresses.length > 0
      ? JSON.parse(localStorage.getItem("user")).addresses[0].body
      : "",
  paymentMethod: "naira",
  paymentMode: "on-demand"
});

export const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHECKOUT:
      return state
        .set("title", action.data.title)
        .set("html", action.data.html);

    case SET_PAYMENT_METHOD:
      return state.set("paymentMethod", action.data.paymentMethod);

    case SET_PAYMENT_MODE:
      return state.set("paymentMode", action.data.paymentMode);

    case SET_DELIVERY_ADDRESS:
      return state.set("deliveryAddress", action.data.deliveryAddress);

    case SET_CHECKOUT_STATUS:
      return state.set(
        "isCheckoutStatusModalOpen",
        action.data.isCheckoutStatusModalOpen
      );

    case SET_CHECKOUT_ATTEMPTING_STATUS:
      return state.set(
        "isAttemptingCheckout",
        action.data.isAttemptingCheckout
      );

    default:
      return state;
  }
};

export const getCheckoutState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
