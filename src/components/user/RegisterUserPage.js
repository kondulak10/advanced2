import React from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as userApi from '../../api/userApi';
import Input from '../common/Input';
import toastr from 'toastr';
import * as userActions from '../../actions/userActions';
import { isEmail, isFilled } from '../../tools/tools';

export class RegisterUserPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      item: {}, //user
      saving: false,
      error: false
    }
    this.updateItemState = this.updateItemState.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  //update user state
  updateItemState(event) {
    const field = event.target.name;
    let item = Object.assign({}, this.state.item);
    item[field] = event.target.value;
    return this.setState({ item: item });
  }

  //register user
  registerUser(event) {
    event.preventDefault();
    var i = this.state.item;
    if (!(isEmail(i.email) && isFilled(i.email) && isFilled(i.password))) {
      this.setState({
        error: true
      })
    }
    else {
      this.setState({
        error: false
      })
      console.log("Register user clicked", this.state.item);
      this.setState({
        saving: true
      })
      this.props.actions.registerUser(this.state.item).then(r => {
        console.log("Saved")
        toastr.success("Saved");
        this.setState({
          saving: false
        })
        this.context.router.push("/home/User created")
      }).catch(r => {
        console.log("Failed", r);
        toastr.error("Error: Try different email");
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
              <h3 style={{ margin: "0 0 20px 0" }}>Register user</h3>
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
              <div className="row">
                <input type="submit" className="btn btn-default right" onClick={this.registerUser} disabled={this.state.saving}
                  value={this.state.saving ? "Submitted" : "Register"} />
              </div>
            </div>
          </div>
        </div>


      </div>
    )
  }
}

RegisterUserPage.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUserPage)
