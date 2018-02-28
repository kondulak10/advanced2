import React from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Input from '../common/Input';
import * as UserApi from '../../api/userApi';
import toastr from 'toastr';
import * as userActions from '../../actions/userActions';
import { isEmail, isFilled } from '../../tools/tools';

export class LoginUserPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      item: {}, //user
      saving: false,
      error: false
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

    var i = this.state.item;
    if (!(i && isEmail(i.email) && isFilled(i.email) && isFilled(i.password))) {
      this.setState({
        error: true
      })
    }

    else {
      this.setState({
        error: false
      })
      console.log("Login user clicked", this.state.item);
      this.setState({
        saving: true
      })
      this.props.actions.loginUser(this.state.item).then(r => {
        console.log("Logged")
        this.setState({
          saving: false
        })
        this.context.router.push("/home/User logged")
      }).catch(r => {
        console.log("Failed", r);
        toastr.error("Error");
        this.setState({
          saving: false
        })
      })
    }
  }


  render() {
    return (
      <div className=".col-md-12" style={{ width: "400px" }}>
        <div className="row">
          <div className="col s12 m5">
            <div className="card-panel teal grey lighten-4" style={{ minWidth: "380px" }}>
              <h3 style={{ margin: "0 0 20px 0" }}>Login user</h3>
              <Input
                type="text"
                label="Email"
                name="email"
                onChange={this.updateItemState}
              />
              <Input
                type="password"
                label="Password"
                name="password"
                onChange={this.updateItemState}
              />
              {
                this.state.error &&
                <div className="row">
                  <span className="error">Please, fill all the fields</span>
                </div>
              }
              <div className="row" style={{ marginTop: "15px" }}>
                <input type="submit" className="btn btn-default right" onClick={this.loginUser} disabled={this.state.saving}
                  value={this.state.saving ? "Submitted" : "Login"} />
              </div>
            </div>
          </div>
        </div>

      </div>

    )
  }
}

LoginUserPage.contextTypes = {
  router: PropTypes.object
};


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
