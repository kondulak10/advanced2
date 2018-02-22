import { combineReducers } from 'redux';
import ajaxCallsInProgress from "./ajaxStatusReducer"
import user from './userReducer'
import items from './itemReducer'
import cart from './cartReducer'

const rootReducer = combineReducers({
  ajaxCallsInProgress,
  user,
  items,
  cart
})

export default rootReducer;
