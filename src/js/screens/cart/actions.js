import {
  ADD_CART_ITEM,
  SET_CART_MODAL_STATUS,
  REMOVE_CART_ITEM,
  INCREMENT_CART_ITEM_QTY,
  DECREMENT_CART_ITEM_QTY,
  CLEAR_CART
} from "./constants";
import { getPageData } from "../../../../service/service";

import {
  isLoading,
  setMeta,
  setTitle,
  setUrl
} from "../../containers/app/actions";

export const addCartItem = data => {
  return {
    type: ADD_CART_ITEM,
    data: {
      ...data,
      qty: 1
    }
  };
};

export const removeCartItem = data => {
  return {
    type: REMOVE_CART_ITEM,
    data
  };
};

export const incrementCartItemQty = data => {
  return {
    type: INCREMENT_CART_ITEM_QTY,
    data
  };
};

export const decrementCartItemQty = data => {
  return {
    type: DECREMENT_CART_ITEM_QTY,
    data
  };
};

export const setCartModalStatus = data => {
  return {
    type: SET_CART_MODAL_STATUS,
    data
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART
  };
};

export const fetchCart = data => {
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
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  };
};
