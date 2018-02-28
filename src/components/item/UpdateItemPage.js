import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as itemActions from '../../actions/itemActions';
import * as ajaxStatusActions from '../../actions/ajaxStatusActions';
import Input from '../common/Input';
import * as itemApi from '../../api/itemApi';
import toastr from 'toastr';
import { isInt, isFilled } from '../../tools/tools';

export class UpdateItemPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      item: {}, //user
      saving: false,
      error: false
    }
    this.updateItemState = this.updateItemState.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  componentDidMount() {
    var id = this.props.id;
    this.props.ajaxStatusActions.ajaxCallBegin();
    itemApi.getItemById(id).then(r => {
      console.log("Item", r);
      this.setState({
        item: r
      })
      this.props.ajaxStatusActions.ajaxCallEnd();
    }).catch(r => {
      this.props.ajaxStatusActions.ajaxCallError();
      console.log("Err", r);
    })
  }

  updateItemState(event) {
    const field = event.target.name;
    let item = Object.assign({}, this.state.item);
    item[field] = event.target.value;
    return this.setState({ item: item });
  }

  updateItem() {
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
      this.setState({
        saving: true
      })
      this.props.ajaxStatusActions.ajaxCallBegin();
      itemApi.updateItem(this.state.item).then(r => {
        console.log("Updated item", r);
        this.setState({
          saving: false
        })
        this.props.ajaxStatusActions.ajaxCallEnd();
        toastr.success("Item updated");
      }).catch(r => {
        this.setState({
          saving: false
        })
        this.props.ajaxStatusActions.ajaxCallError();
        console.log("Err", r);
        toastr.error("Update failed");
      })
    }
  }

  render() {
    const item = this.state.item;
    return (

      <div className=".col-md-12" style={{ width: "400px", marginLeft: "5px" }}>
        <div className="row">
          <div className="col s12 m5">
            <div className="card-panel teal grey lighten-4" style={{ minWidth: "380px" }}>
              <h3 style={{ margin: "0 0 20px 0" }}>Update item</h3>

              <Input
                type="text"
                label="Name"
                name="name"
                value={item.name || ""}
                onChange={this.updateItemState}
              />
              <Input
                type="number"
                label="Price"
                name="price"
                value={item.price || ""}
                onChange={this.updateItemState}
              />
              <Input
                type="text"
                label="Brand"
                name="brand"
                value={item.brand || ""}
                onChange={this.updateItemState}
              />
              <Input
                type="number"
                label="Discount percentage"
                name="discount"
                value={item.discount || ""}
                onChange={this.updateItemState}
              />
              <Input
                type="number"
                label="Pay (Used for special action if not 1)"
                name="pay"
                value={item.pay || ""}
                onChange={this.updateItemState}
              />
              <Input
                type="number"
                label="Receive (Used for special action if not 1)"
                name="receive"
                value={item.receive || ""}
                onChange={this.updateItemState}
              />
              {
                this.state.error &&
                <div className="row">
                  <span className="error">Please, fill all the fields properly</span>
                </div>
              }
              <div className="row">
                <input type="submit" className="btn btn-default right" onClick={this.updateItem} disabled={this.state.saving}
                  value={this.state.saving ? "Submitted" : "Submit"} />
              </div>

            </div>
          </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.params.id;

  return {
    state: state,
    id: id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(itemActions, dispatch),
    ajaxStatusActions: bindActionCreators(ajaxStatusActions, dispatch)

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateItemPage)
