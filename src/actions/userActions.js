import * as types from './actionTypes'
import * as userApi from '../api/userApi';
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
    return userApi.createItem(item).then(r => {
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
    return userApi.login(item).then(r => {
      dispatch(loginUserSuccess(r));
    }).catch(r => {
      dispatch(ajaxCallError(r));
      throw (r);
    })
  }
}
