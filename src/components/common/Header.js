import React, { PropTypes } from 'react';
import { Link, IndexLink } from "react-router";
import LoadingDots from './LoadingDots';

const Header = ({ loading }) => {
  return (
    <div>
      {loading && <LoadingDots interval={100} dots={20}></LoadingDots>}
      <ul className="nav nav-tabs">
        <li role="presentation">
          <IndexLink to="/" activeClassName="active">Home</IndexLink>
        </li>
        <li role="presentation">
          <Link to="/user/register" activeClassName="active">Register user</Link>
        </li>
        <li role="presentation">
          <Link to="/user/login" activeClassName="active">Login user</Link>
        </li>
      </ul>
    </div>
  )
}



export default Header;
