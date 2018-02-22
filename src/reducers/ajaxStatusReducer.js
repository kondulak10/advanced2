import * as types from "../actions/actionTypes"
import initialState from "./initialState"

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) == "_SUCCESS";
}

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
  if (action.type == types.AJAX_BEGIN) {
    return state + 1;
  }
  else if (action.type == types.AJAX_SUCCESS || action.type == types.AJAX_ERROR || actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }
  return state;
}
