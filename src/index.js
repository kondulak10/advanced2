import routes from "./routes";
import "babel-polyfill"
import React from 'react';
import { render } from "react-dom"
import { Router, browserHistory } from "react-router"
import "../node_modules/materialize-css/dist/css/materialize.css"
import "./styles/styles.css"
import configureStore from './store/configureStore';
import { Provider } from 'react-redux'
import "../node_modules/toastr/build/toastr.min.css"
import { loadCart } from './actions/cartActions';
import { useToken } from './actions/userActions';

const store = configureStore()
store.dispatch(loadCart());
if (localStorage.getItem("Authorization")) {
  store.dispatch(useToken({
    token: localStorage.getItem("Authorization")
  }))
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}></Router>
  </Provider>,
  document.getElementById("app")
)
