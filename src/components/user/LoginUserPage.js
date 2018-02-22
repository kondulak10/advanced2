import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Input from '../common/Input';
import UserApi from '../../api/mock/mockUserApi';
import toastr from 'toastr';
import * as userActions from '../../actions/userActions';

export class LoginUserPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      item: {}, //user
      saving: false
    }
    this.updateItemState = this.updateItemState.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  //update user state
  updateItemState(event) {
    const field = event.target.name;
    let item = Object.assign({}, this.state.item);
    item[field] = event.target.value;
    return this.setState({ item: item });
  }

  //login
  loginUser(event) {
    event.preventDefault();
    console.log("Login user clicked", this.state.item);
    this.setState({
      saving: true
    })
    this.props.actions.loginUser(this.state.item).then(r => {
      console.log("Logged")
      toastr.success("Logged");
      this.setState({
        saving: false
      })
    }).catch(r => {
      console.log("Failed", r);
      toastr.error("Error");
      this.setState({
        saving: false
      })
    })
  }


  render() {
    return (
      <div className=".col-md-12" style={{ width: "400px" }}>
        <h3>Login user</h3>
        <Input
          type="text"
          label="Email"
          name="email"
          onChange={this.updateItemState}
        />
        <Input
          type="text"
          label="Password"
          name="password"
          onChange={this.updateItemState}
        />
        <div className="input-group" style={{ marginTop: "15px" }}>
          <input type="submit" className="btn btn-default" onClick={this.loginUser} disabled={this.state.saving}
            value={this.state.saving ? "Submitted" : "Submit"} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginUserPage)
