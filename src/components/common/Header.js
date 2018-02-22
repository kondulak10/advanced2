import React, { PropTypes } from 'react';
import { Link, IndexLink } from "react-router";
import LoadingDots from './LoadingDots';

const Header = ({ loading }) => {
  return (
    <div>
      Header
    <nav>
        <IndexLink to="/" activeClassName="active">home</IndexLink> <br />
        <Link to="/items" activeClassName="active">items</Link> <br />

      {loading && <LoadingDots interval={100} dots={20}></LoadingDots>}

      </nav>

    </div>
  )
}



export default Header;
