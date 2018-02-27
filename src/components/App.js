import React, { PropTypes } from 'react';
import Header from './common/Header';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      console.log("updated");
      <div>
        <Header
          loading={this.props.loading}
        ></Header>
        {this.props.loading}
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  }
}

export default connect(mapStateToProps)(App);
