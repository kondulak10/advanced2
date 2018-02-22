import * as types from './actionTypes'

export function beginAjaxCall() {
  return {type: types.AJAX_BEGIN}
}

export function ajaxCallError() {
  return {type: types.AJAX_ERROR}
}
