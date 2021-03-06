import React from 'react';
import { PropTypes } from 'react';
import axios from 'axios';
import * as itemApi from '../../api/itemApi';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    }

  }

  render() {


    return (
      <div className=".col-md-12">
        {this.props.params.message &&
          <div className="row">
            <div className="col s12 m5">
              <div className="card-panel teal lighten-2">
                <span className="white-text">
                  <h3>{this.props.params.message}</h3>
                </span>
              </div>
            </div>
          </div>
        }
        <div className="row">
          <div className="col s12 m5">
            <div className="card-panel teal grey lighten-4">
              <span>
                <h3>First iteration: User</h3>
                <b>Email: user@user.user, Password: user</b>
                <ul>
                  <li>As a user, I want to be able to create an account so that I can buy a product</li>
                  <li>As a user, I want to be able to add interesting items to the cart and buy them later.</li>
                  <li>As a user, I want to be able to search in items and add some filters on attributes of goods, like
                  filtering based on price, brand or material.</li>
                </ul>
                <ul>
                  <li>As a admin, I want to be able to be able to add new items to the e-commerce site</li>
                  <li>As a admin, I want to be able to create sales with percentages and package deals (e.g., 3 for 2
                  deals)</li>
                </ul>

              </span>
            </div>
          </div>
          <div className="col s12 m5">
            <div className="card-panel teal grey lighten-4">
              <span>
                <h3>First iteration: Admin</h3>
                <b>Email: admin@admin.admin, Password: admin</b>
                <ul>
                  <li>As an admin, I want to be able to be able to add new items to the e-commerce site</li>
                  <li>As an admin, I want to be able to create sales with percentages and package deals (e.g., 3 for 2
                deals)</li>
                </ul>

              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m5">
            <div className="card-panel teal grey lighten-4">
              <h3 style={{ margin: "0 0 20px 0" }}>Quick links</h3>
              <a href="https://github.com/kondulak10/advanced2" target="_blank">
                <div className="chip" >
                  Github
                </div>
              </a>
              <a href="https://advanced2heroku.herokuapp.com/" target="_blank">
                <div className="chip" >
                  Heroku
              </div>
              </a>
              <a href="https://travis-ci.org/kondulak10/advanced2/builds" target="_blank">
                <div className="chip" >
                  Travis
                </div>
              </a>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

HomePage.contextTypes = {
  router: PropTypes.object
};

export default HomePage;
