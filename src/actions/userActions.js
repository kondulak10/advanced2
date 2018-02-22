import * as types from './actionTypes'
import itemApi from '../api/mock/mockUserApi';
import { ajaxCallBegin, ajaxCallError } from "./ajaxStatusActions"

//types
export function registerUserSuccess(item) {
  return {
    type: types.USER_REGISTER_SUCCESS, item
  }
}

export function loginUserSuccess(item) {
  return {
    type: types.USER_LOGIN_SUCCESS, item
  }
}

//logic
export function registerUser(item) {
  return function (dispatch) {
    dispatch(ajaxCallBegin());
    return itemApi.createItem(item).then(r => {
      dispatch(registerUserSuccess(r));
    }).catch(r => {
      dispatch(ajaxCallError(r))
      throw (r);
    })
  }
}

export function loginUser(item) {
  return function (dispatch) {
    dispatch(ajaxCallBegin());
    return itemApi.loginUser(item).then(r => {
      dispatch(loginUserSuccess(r));
    }).catch(r => {
      dispatch(ajaxCallError(r));
      throw (r);
    })
  }
}
