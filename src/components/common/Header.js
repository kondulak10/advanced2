import React, { PropTypes } from 'react';
import { Link, IndexLink } from "react-router";
import LoadingDots from './LoadingDots';
import { connect } from 'react-redux'

export class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        {this.props.loading && <LoadingDots interval={100} dots={20}></LoadingDots>}
        <ul className="nav nav-tabs">
          <li role="presentation">
            <IndexLink to="/" activeClassName="active">Home</IndexLink>
          </li>
          <li role="presentation">
            <Link to="items" activeClassName="active">Items</Link>
          </li>
          <li role="presentation">
            <Link to="createItem" activeClassName="active">Create item</Link>
          </li>
          <li role="presentation">
            <Link to="cart" activeClassName="active">Cart</Link>
          </li>
          {Object.keys(this.props.user).length == 0 &&
            <li role="presentation">
              <Link to="registerUser" activeClassName="active">Register user</Link>
            </li>
          }
          {Object.keys(this.props.user).length == 0 &&
            <li role="presentation">
              <Link to="loginUser" activeClassName="active">Login user</Link>
            </li>
          }
          {Object.keys(this.props.user).length > 0 &&
            <li role="presentation">
              <a href="#">
                User logged: {this.props.user.email}
              </a>
            </li>
          }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    loading: ownProps.loading,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
