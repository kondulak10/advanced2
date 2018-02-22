import * as types from './actionTypes';
import cartApi from '../api/cartApi';
import { ajaxCallBegin, ajaxCallError } from "./ajaxStatusActions"

//types
export function cartLoadedSuccess(items) {
  return {
    type: types.CART_LOADED_SUCCESS, items
  }
}

export function cartAddedSuccess(items) {
  return {
    type: types.CART_ADDED_SUCCESS, items
  }
}

export function cartDeleteSuccess(items) {
  return {
    type: types.CART_DELETED_SUCCESS, items
  }
}

//logic
export function loadCart() {
  return function (dispatch) {
    dispatch(cartLoadedSuccess(cartApi.getAll()))
  }
}

export function addToCart(item) {
  return function (dispatch) {
    dispatch(cartAddedSuccess(cartApi.addToCart(item)))
  }
}

export function deleteCart() {
  return function (dispatch) {
    cartApi.deleteCart();
    dispatch(cartDeleteSuccess([]));
  }
}

