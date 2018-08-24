import {
  ADD_USER_ORDER,
  SET_CHECKOUT,
  SET_PAYMENT_METHOD,
  SET_PAYMENT_MODE,
  SET_DELIVERY_ADDRESS,
  SET_CHECKOUT_ATTEMPTING_STATUS,
  SET_CHECKOUT_STATUS
} from "./constants";
import { getPageData } from "../../../../service/service";
import { sendRequest } from "../../services/ApiService";

import {
  isLoading,
  setMeta,
  setTitle,
  setUrl
} from "../../containers/app/actions";

import { addUserOrder } from "../../screens/account/actions";

const HOST_URL =
  window.location.origin === "https://instachaw.com"
    ? "https://api.instachaw.com"
    : "http://localhost:3333";

export const attemptOrderPlacement = (data, callback) => {
  return dispatch => {
    let endpoint = `api/v1/orders`;
    dispatch(
      setCheckoutAttemptingStatus({
        isAttemptingCheckout: true
      })
    );

    sendRequest({
      endpoint: `${HOST_URL}/${endpoint}`,
      method: "POST",
      payload: JSON.stringify(data)
    })
      .then(response => {
        if (typeof response !== "undefined" && response !== null) {
          dispatch(
            addUserOrder({
              order: response
            })
          );

          dispatch(
            setCheckoutAttemptingStatus({
              isAttemptingCheckout: false
            })
          );

          callback(response);
        } else {
          setTimeout(() => {
            dispatch(
              setCheckoutAttemptingStatus({
                isAttemptingCheckout: false
              })
            );
          }, 1000);
        }
      })
      .catch(e => console.log(e));
  };
};

const loadCheckout = data => {
  return {
    type: SET_CHECKOUT,
    data
  };
};

export const setPaymentMethod = data => {
  return {
    type: SET_PAYMENT_METHOD,
    data
  };
};

export const setPaymentMode = data => {
  return {
    type: SET_PAYMENT_MODE,
    data
  };
};

export const setDeliveryAddress = data => {
  return {
    type: SET_DELIVERY_ADDRESS,
    data
  };
};

export const setCheckoutAttemptingStatus = data => {
  return {
    type: SET_CHECKOUT_ATTEMPTING_STATUS,
    data
  };
};

export const setCheckoutStatusModalVisibility = data => {
  return {
    type: SET_CHECKOUT_STATUS,
    data
  };
};

export const fetchCheckout = data => {
  return dispatch => {
    dispatch(isLoading(true));

    return getPageData(data)
      .then(response => {
        dispatch(setMeta(response.meta));
        dispatch(setUrl(response.url));
        dispatch(setTitle(response.title));
        return response;
      })
      .then(response => {
        dispatch(isLoading(false));
        dispatch(loadCheckout(response));
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  };
};
