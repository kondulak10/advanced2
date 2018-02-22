import * as types from "../actions/actionTypes"

export default function itemReducer(state = [], action) {
  switch (action.type) {
    case types.ITEM_CREATED_SUCCESS:
      return state;
    case types.ITEMS_LOADED_SUCCESS:
      return action.items;
    default:
      return state;
  }
}
