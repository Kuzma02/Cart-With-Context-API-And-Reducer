import { useState } from "react";
import {
  CLEAR_CART,
  REMOVE_ITEM,
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
  CALULATE_TOTALS,
  FETCH_DATA,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  } else if (action.type === REMOVE_ITEM) {
    const filteredCart = state.cart.filter(
      (item) => item.id !== action.payload.id
    );
    return { ...state, cart: filteredCart };
  } else if (action.type === INCREASE_AMOUNT) {
    const newCart = state.cart.map((item) => {
      if (item.id === action.payload.id) {
        item.amount++;
      }
      return item;
    });
    return { ...state, cart: newCart };
  } else if (action.type === DECREASE_AMOUNT) {
    const newCart = state.cart.map((item) => {
      if (item.id === action.payload.id) {
        if(item.amount !== 1){
          item.amount--;
        }else{
          
        }

      }
      return item;
    });
    return { ...state, cart: newCart };
  } else if (action.type === CALULATE_TOTALS) {
    const currentTotal = state.cart.reduce(
      (sum, current) => sum + current.amount * +current.price,
      0
    );
    return { ...state, total: currentTotal };
  }else if(action.type === FETCH_DATA){
    return {...state, cart: action.payload.data};
  }

  throw new Error(`No matching "${action.type}" - action type`);
};

export default reducer;
