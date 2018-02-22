import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from "./components/App"
import HomePage from "./components/home/HomePage"
import RegisterUserPage from './components/user/RegisterUserPage';
import LoginUserPage from './components/user/LoginUserPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}></IndexRoute>
    <Route path="user/register" component={RegisterUserPage}></Route>
    <Route path="user/login" component={LoginUserPage}></Route>
  </Route>
)
