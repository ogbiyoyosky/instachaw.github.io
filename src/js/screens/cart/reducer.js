import { fromJS } from "immutable";

import {
  SET_CART,
  SET_CART_MODAL_STATUS,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  INCREMENT_CART_ITEM_QTY,
  DECREMENT_CART_ITEM_QTY,
  CLEAR_CART,
  REDUCER_NAME
} from "./constants";

const initialState = fromJS({
  title: "",
  html: "",
  items: [
    // {
    //   id: 1,
    //   title: "Cheese Hamburger",
    //   price: 800,
    //   vat: 0.01,
    //   description: "Cheese Hamburgers are delectable",
    //   photo: "hamburger.jpg",
    //   qty: 1
    // }
  ],
  isCartModalOpen: false
});

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      return state.set("items", state.get("items").push(fromJS(action.data)));

    case REMOVE_CART_ITEM:
      return state.updateIn(["items"], items =>
        fromJS(
          items.toJS().filter(item => {
            return item.id !== action.data.id;
          })
        )
      );

    case INCREMENT_CART_ITEM_QTY:
      return state.updateIn(["items"], items => {
        return fromJS(
          items.map(item => {
            if (item.toJS().id === action.data.id) {
              return item.set("qty", parseInt(item.toJS().qty, 10) + 1);
            }

            return item;
          })
        );
      });

    case DECREMENT_CART_ITEM_QTY:
      return state.updateIn(["items"], items => {
        return fromJS(
          items.map(item => {
            if (item.toJS().id === action.data.id) {
              return item.set("qty", parseInt(item.toJS().qty, 10) - 1);
            }

            return item;
          })
        );
      });

    case SET_CART:
      return state
        .set("title", action.data.title)
        .set("html", action.data.html);

    case SET_CART_MODAL_STATUS:
      return state.set("isCartModalOpen", action.data);

    case CLEAR_CART:
      return state.set("items", fromJS([]));

    default:
      return state;
  }
};

export const getCartState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
