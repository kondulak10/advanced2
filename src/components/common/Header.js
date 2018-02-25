import React, { PropTypes } from 'react';
import { Link, IndexLink } from "react-router";
import LoadingDots from './LoadingDots';
import { connect } from 'react-redux'
import axios from 'axios';
import * as userActions from '../../actions/userActions';
import { bindActionCreators } from 'redux';

export class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.actions.logoutUser();
    console.log("User logged out");
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
          {this.props.user.admin &&
            <li role="presentation">
            <Link to="createItem" activeClassName="active">Create item</Link>
          </li>
          }
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
          {Object.keys(this.props.user).length > 0 &&
            <li role="presentation" onClick={this.logout}>
              <a href="#">
                Log out
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
    actions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
