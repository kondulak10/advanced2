import React from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Input from '../common/Input';
import toastr from 'toastr';
import * as itemActions from '../../actions/itemActions';

export class CreateItemPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      item: {}, //user
      saving: false
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

  render() {
    return (
      <div>
        <div className=".col-md-12" style={{ width: "400px", marginLeft: "15px" }}>
          <h3>Create item</h3>
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
            label="Discount"
            name="discount"
            onChange={this.updateItemState}
          />
          <Input
            type="number"
            label="Pay"
            name="pay"
            onChange={this.updateItemState}
          />
          <Input
            type="number"
            label="Get"
            name="get"
            onChange={this.updateItemState}
          />
          <div className="input-group">
            <input type="submit" className="btn btn-default" onClick={this.createItem} disabled={this.state.saving}
              value={this.state.saving ? "Submitted" : "Submit"} />
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
