import * as types from './actionTypes';
import cartApi from '../api/cartApi';
import { ajaxCallBegin, ajaxCallError } from "./ajaxStatusActions"

//types
export function cartLoadedSuccessX(items) {
  return {
    type: types.CART_LOADED_SUCCESSX, items
  }
}

export function cartAddedSuccessX(items) {
  return {
    type: types.CART_ADDED_SUCCESSX, items
  }
}

export function cartDeleteSuccessX(items) {
  return {
    type: types.CART_DELETED_SUCCESSX, items
  }
}

export function cartBoughtSuccess(items) {
  return {
    type: types.CART_BOUGHT_SUCCESS, items
  }
}

//logic
export function loadCart() {
  return function (dispatch) {
    dispatch(cartLoadedSuccessX(cartApi.getAll()))
  }
}

export function addToCart(item) {
  return function (dispatch) {
    dispatch(cartAddedSuccessX(cartApi.addToCart(item)))
  }
}

export function deleteCart() {
  return function (dispatch) {
    cartApi.deleteCart();
    dispatch(cartDeleteSuccessX([]));
  }
}

export function buyCart(cart) {
  return function (dispatch) {
    dispatch(ajaxCallBegin());
    return cartApi.buyCart(cart).then(price => {
      dispatch(cartBoughtSuccess(price));
      console.log("There is price",price)
    }).catch(r => {
      dispatch(ajaxCallError(r))
      throw (r);
    })
  }
}
