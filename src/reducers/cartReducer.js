import * as types from "../actions/actionTypes"

export default function userReducer(state = [], action) {
  switch (action.type) {
    case types.CART_ADDED_SUCCESSX:
      return action.items;
    case types.CART_DELETED_SUCCESSX:
      return [];
    case types.CART_LOADED_SUCCESSX:
      return action.items;
    case types.CART_BOUGHT_SUCCESS:
      return [];
    default:
      return state;
  }
}
