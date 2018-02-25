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

export function logoutUserSuccess() {
  return {
    type: types.USER_LOGOUT_SUCCESS, item: null
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
      const user = r.data.user;
      const token = r.data.token;
      localStorage.setItem("Authorization", token);
      localStorage.setItem("User", r.data.user.email);
      dispatch(loginUserSuccess(user));
    }).catch(r => {
      dispatch(ajaxCallError(r));
      throw (r);
    })
  }
}

export function useToken(item) {
  return function (dispatch) {
    dispatch(ajaxCallBegin());
    return userApi.useToken(item).then(r => {
      const user = r.data.user;
      const token = r.data.token;
      localStorage.setItem("Authorization", token);
      localStorage.setItem("User", r.data.user.email);
      dispatch(loginUserSuccess(user));
    }).catch(r => {
      dispatch(ajaxCallError(r));
      throw (r);
    })
  }
}

export function logoutUser() {
  return function (dispatch) {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("User");
    dispatch(logoutUserSuccess());
    // dispatch(ajaxCallBegin());
    // return userApi.logoutUser().then(r => {
    //   dispatch(logoutUserSuccess());
    // }).catch(r => {
    //   dispatch(ajaxCallError(r));
    //   throw (r);
    // })
  }
}
