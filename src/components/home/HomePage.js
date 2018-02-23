import React from 'react';
import { PropTypes } from 'react';
import axios from 'axios';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    }

  }

  render() {
    return (
      <div>
        {this.props.params.message &&
          <div className=".col-md-12" style={{ width: "400px", marginLeft: "15px" }}>
            <h3>{this.props.params.message}</h3>
          </div>
        }

      </div>
    )
  }
}

HomePage.contextTypes = {
  router: PropTypes.object
};

export default HomePage;
