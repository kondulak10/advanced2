import * as types from './actionTypes';
import itemApi from '../api/mock/mockItemApi';
import { ajaxCallBegin, ajaxCallError } from "./ajaxStatusActions"

//types
export function itemsLoadedSuccess(items) {
  return {
    type: types.ITEMS_LOADED_SUCCESS, items
  }
}

export function itemCreatedSuccess(item) {
  return {
    type: types.ITEM_CREATED_SUCCESS, item
  }
}

//logic
export function createItem(item) {
  return function (dispatch) {
    dispatch(ajaxCallBegin());
    return itemApi.createItem(item).then(r => {
      dispatch(itemCreatedSuccess(r));
    }).catch(r => {
      dispatch(ajaxCallError(r))
      throw (r);
    })
  }
}

export function getAll() {
  return function (dispatch) {
    dispatch(ajaxCallBegin());
    return itemApi.getAll().then(r => {
      dispatch(itemsLoadedSuccess(r));
    }).catch(r => {
      dispatch(ajaxCallError(r))
      throw (r);
    })
  }
}
