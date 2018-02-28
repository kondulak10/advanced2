import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as cartActions from '../../actions/cartActions';
import ItemCartRow from '../item/ItemCartRow';
import toastr from 'toastr';
import cartApi from '../../api/cartApi';
import * as ajaxStatusActions from '../../actions/ajaxStatusActions';
import axios from 'axios';
import { Link, IndexLink } from "react-router";


export class CartPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.emptyCart = this.emptyCart.bind(this);
    this.buyCart = this.buyCart.bind(this);
    this.buyCartServer = this.buyCartServer.bind(this);
  }

  //get initial data
  componentDidMount() {
    console.log("Get data");
    this.props.actions.loadCart();
  }

  emptyCart() {
    this.props.actions.deleteCart();
    toastr.success("Cart emptied")
  }

  buyCart() {
    //calling directly
    this.props.ajaxStatusActions.startAjaxCall();
    cartApi.buyCart(this.props.state.cart).then(data => {
      var finalCart = data[0];
      var price = data[1];
      alert("Cart bought for " + price);
      console.log("Final:", finalCart, price);
      toastr.success("Cart bought");
      this.props.actions.deleteCart();
      this.props.ajaxStatusActions.endAjaxCall();
    }).catch(r => {
      toastr.error("Error");
      this.props.ajaxStatusActions.endAjaxCall();
    })
  }

  buyCartServer() {
    this.props.ajaxStatusActions.startAjaxCall();
    axios.post("/api/buyCart", this.props.state.cart, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Authorization")
      }
    }).then(data => {
      toastr.success("Cart bought");
      console.log("Cart bought", data.data)
      this.props.actions.deleteCart();
      this.props.ajaxStatusActions.endAjaxCall();
    }).catch(r => {
      toastr.error("Error");
      this.props.ajaxStatusActions.endAjaxCall();
    })
  }

  render() {
    return (
      <div className=".col-md-12">
        <div className="row">
          <div className="col s12 m5">
            <div className="card-panel teal grey lighten-4" style={{ minWidth: "360px" }}>
              <h3 style={{ margin: "0 0 20px 0" }}>Cart</h3>
              <table className="striped centered" style={{ margin: "0 0 20px 0" }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Special offer</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.state.cart && this.props.state.cart.map(item =>
                      <ItemCartRow key={item._id} item={item} quantity={true}></ItemCartRow>
                    )
                  }
                </tbody>
              </table>
              <div className="btn btn-default grey lighten-4" onClick={this.emptyCart} style={{ color: "rgba(0, 0, 0, 0.87)" }}>
                Empty cart
              </div>
              {
                (Object.keys(this.props.state.user).length != 0 && localStorage.getItem("cart")) &&

                <div className="btn btn-default" onClick={this.buyCartServer} style={{ float: "right" }}>
                  Buy cart
                </div>
              }
              {
                Object.keys(this.props.state.user).length == 0 &&
                <Link className="btn btn-default" to="loginUser" style={{ float: "right" }}>Login user</Link>
              }
            </div>
          </div>
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
    actions: bindActionCreators(cartActions, dispatch),
    ajaxStatusActions: bindActionCreators(ajaxStatusActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
