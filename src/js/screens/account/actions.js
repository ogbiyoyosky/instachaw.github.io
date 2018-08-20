import {
  SET_ACCOUNT,
  SET_USER,
  SET_TRANSACTIONS_COUNT,
  SET_FUNDING_MODAL_STATUS,
  SET_FUNDING_AMOUNT,
  SET_FUNDING_METHOD,
  SET_PAYMENT_CURRENCY,
  SET_FUNDING_ATTEMPTING_STATUS,
  SET_STEEMIT_USERNAME,
  ADD_USER_ORDER,
  SET_ORDERS
} from "./constants";
import { sendRequest } from "../../services/ApiService";

import {
  isLoading,
  setMeta,
  setTitle,
  setUrl
} from "../../containers/app/actions";
import { getPageData } from "../../../../service/service";

const loadAccount = data => {
  return {
    type: SET_ACCOUNT,
    data
  };
};

export const addUserOrder = data => {
  return {
    type: ADD_USER_ORDER,
    data
  };
};

export const fetchOrders = () => {
  return dispatch => {
    sendRequest({
      endpoint: "http://localhost:3333/api/v1/orders",
      method: "GET"
    })
      .then(response => {
        if (typeof response !== "undefined" && typeof response !== null) {
          dispatch(
            setOrders({
              orders: response
            })
          );
        }
      })
      .catch(e => console.log(e));
  };
};

export const fetchTransactionToken = (cb = () => {}) => {
  return dispatch => {
    sendRequest({
      endpoint: `http://localhost:3333/api/v1/transactions/generateToken`,
      method: "POST"
    })
      .then(response => {
        if (typeof response !== "undefined" && typeof response !== null) {
          return cb(response.token, response.transactionsCount);
        }
      })
      .catch(e => console.log(e));
  };
};

export const fetchTransactionsCount = ({ userID }, cb = () => {}) => {
  return dispatch => {
    sendRequest({
      endpoint: `http://localhost:3333/api/v1/transactions?type=getCount&uid=${userID}`,
      method: "GET"
    })
      .then(response => {
        if (typeof response !== "undefined" && typeof response !== null) {
          dispatch(
            setTransactionsCount({
              transactionsCount: response
            })
          );
          cb(response);
        }
      })
      .catch(e => console.log(e));
  };
};

export const cancelOrder = data => {
  return dispatch => {
    sendRequest({
      endpoint: `http://localhost:3333/api/v1/orders/${data.orderID}`,
      method: "DELETE"
    })
      .then(response => {
        if (typeof response !== "undefined" && typeof response !== null) {
          dispatch(fetchOrders());
        }
      })
      .catch(e => console.log(e));
  };
};

export const setTransactionsCount = data => {
  return {
    type: SET_TRANSACTIONS_COUNT,
    data
  };
};

export const setFundingModalStatus = data => {
  return {
    type: SET_FUNDING_MODAL_STATUS,
    data
  };
};

export const setFundingAmount = data => {
  return {
    type: SET_FUNDING_AMOUNT,
    data
  };
};

export const setFundingMethod = data => {
  return {
    type: SET_FUNDING_METHOD,
    data
  };
};

export const setFundingAttemptingStatus = data => {
  return {
    type: SET_FUNDING_ATTEMPTING_STATUS,
    data
  };
};

export const setSteemitUsername = data => {
  return {
    type: SET_STEEMIT_USERNAME,
    data
  };
};

export const setOrders = data => {
  return {
    type: SET_ORDERS,
    data
  };
};

export const setUser = data => {
  return {
    type: SET_USER,
    data
  };
};

export const fetchAccount = data => {
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
        dispatch(loadAccount(response));
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  };
};
