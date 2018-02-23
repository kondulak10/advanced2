import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from "./components/App"
import HomePage from "./components/home/HomePage"
import RegisterUserPage from './components/user/RegisterUserPage';
import LoginUserPage from './components/user/LoginUserPage';
import ItemsPage from './components/item/ItemsPage';
import CreateItemPage from './components/item/CreateItemPage';
import CartPage from './components/cart/CartPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}></IndexRoute>
    <Route path="home/:message" component={HomePage}></Route>
    <Route path="registerUser" component={RegisterUserPage}></Route>
    <Route path="loginUser" component={LoginUserPage}></Route>
    <Route path="items" component={ItemsPage}></Route>
    <Route path="createItem" component={CreateItemPage}></Route>
    <Route path="updateItem/:id" component={UpdateItemPage}></Route>
    <Route path="cart" component={CartPage}></Route>
  </Route>
)
