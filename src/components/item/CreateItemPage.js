import React from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Input from '../common/Input';
import toastr from 'toastr';
import * as itemActions from '../../actions/itemActions';
import { isFilled, isInt } from '../../tools/tools';

export class CreateItemPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      item: {}, //user
      saving: false,
      error: false
    }
    this.updateItemState = this.updateItemState.bind(this);
    this.createItem = this.createItem.bind(this);
  }

  //update user state
  updateItemState(event) {
    const field = event.target.name;
    let item = Object.assign({}, this.state.item);
    item[field] = event.target.value;
    return this.setState({ item: item });
  }

  //register user
  createItem(event) {
    event.preventDefault();
    var i = this.state.item;
    if (!(
      isFilled(i.name) && isFilled(i.price) && isFilled(i.brand) &&
      isFilled(i.discount) && isFilled(i.pay) && isFilled(i.receive)
      && isInt(i.price) && isInt(i.discount) && isInt(i.pay) && isInt(i.receive) &&
      i.pay <= i.receive && i.pay > 0 && i.receive > 0
    )) {
      this.setState({
        error: true
      })
    }
    else {
      this.setState({
        error: false
      })
      console.log("Create item clicked", this.state.item);
      this.setState({
        saving: true
      })
      this.props.actions.createItem(this.state.item).then(r => {
        console.log("Saved")
        toastr.success("Saved");
        this.setState({
          saving: false
        })
        this.context.router.push("/home/Item created")
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
      <div>
        <div className=".col-md-12" style={{ width: "400px" }}>
          <div className="row">
            <div className="col s12 m5">
              <div className="card-panel teal grey lighten-4" style={{ minWidth: "380px" }}>
                <h3 style={{ margin: "0 0 20px 0" }}>Create item</h3>
                <Input
                  type="text"
                  label="Name"
                  name="name"
                  onChange={this.updateItemState}
                />
                <Input
                  type="number"
                  label="Price"
                  name="price"
                  onChange={this.updateItemState}
                />
                <Input
                  type="text"
                  label="Brand"
                  name="brand"
                  onChange={this.updateItemState}
                />
                <Input
                  type="number"
                  label="Discount percentage"
                  name="discount"
                  onChange={this.updateItemState}
                />
                <Input
                  type="number"
                  label="Pay (Used for special action if not 1)"
                  name="pay"
                  onChange={this.updateItemState}
                />
                <Input
                  type="number"
                  label="Receive (Used for special action if not 1)"
                  name="receive"
                  onChange={this.updateItemState}
                />
                {
                  this.state.error &&
                  <div className="row">
                    <span className="error">Please, fill all the fields properly</span>
                  </div>
                }
                <div className="row">
                  <input type="submit" className="btn btn-default right" onClick={this.createItem} disabled={this.state.saving}
                    value={this.state.saving ? "Submitted" : "Create"} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

CreateItemPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(itemActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateItemPage)
