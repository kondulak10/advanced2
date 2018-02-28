import React, { PropTypes } from 'react';
import { Link, IndexLink } from "react-router";
import LoadingDots from './LoadingDots';
import { connect } from 'react-redux'
import axios from 'axios';
import * as userActions from '../../actions/userActions';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

export class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.actions.logoutUser();
    console.log("User logged out");
    browserHistory.push("/");
  }

  render() {
    return (
      <div>
        <div className="row">
          <nav className="nav-extended">
            <div className="nav-wrapper">
              <span style={{ margin: "0 0 0 25px" }}>Task 2 {this.props.loading && <LoadingDots interval={100} dots={20}></LoadingDots>}</span>
              <ul id="nav-mobile" className="right">
                {Object.keys(this.props.user).length == 0 &&
                  <li>
                    <Link to="/registerUser" /*activeClassName="active"*/>Register user</Link>
                  </li>
                }
                {Object.keys(this.props.user).length == 0 &&
                  <li>
                    <Link to="/loginUser" /*activeClassName="active"*/>Login user</Link>
                  </li>
                }
                {Object.keys(this.props.user).length > 0 &&
                  <li className="disabled">
                    <a href="#">
                      User logged: {this.props.user.email}
                    </a>
                  </li>
                }
                {Object.keys(this.props.user).length > 0 &&
                  <li onClick={this.logout}>
                    <a href="#">
                      Log out
                  </a>
                  </li>
                }
              </ul>
            </div>
            <div className="nav-content">
              <ul className="tabs tabs-transparent">
                <li className="tab"><IndexLink to="/" /*activeClassName="active"*/>Home</IndexLink></li>
                <li className="tab"><Link to="/items" /*activeClassName="active"*/>Items</Link></li>
                {this.props.user.admin &&
                  <li className="tab">
                    <Link to="/createItem" /*activeClassName="active"*/>Create item</Link>
                  </li>
                }
                <li className="tab">
                  <Link to="/cart" /*activeClassName="active"*/>Cart</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
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
