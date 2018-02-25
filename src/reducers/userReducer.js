import * as types from "../actions/actionTypes"

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case types.USER_REGISTER_SUCCESS:
      return state;
    case types.USER_LOGIN_SUCCESS:
      return action.item;
    case types.USER_LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}
