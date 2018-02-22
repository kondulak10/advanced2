import * as types from "../actions/actionTypes"

export default function userReducer(state = [], action) {
  switch (action.type) {
    case types.CART_ADDED_SUCCESS:
      return action.items;
    case types.CART_DELETED_SUCCESS:
      return [];
    case types.CART_LOADED_SUCCESS:
      return action.items;
    default:
      return state;
  }
}
