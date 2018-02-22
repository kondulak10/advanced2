import * as types from './actionTypes'

export function ajaxCallBegin() {
  return {type: types.AJAX_BEGIN}
}

export function ajaxCallError() {
  return {type: types.AJAX_ERROR}
}

export function ajaxCallEnd() {
  return {type: types.AJAX_SUCCESS}
}

export function startAjaxCall() {
  return function (dispatch) {
    dispatch(ajaxCallBegin());
  }
}

export function endAjaxCall() {
  return function (dispatch) {
    dispatch(ajaxCallEnd());
  }
}
