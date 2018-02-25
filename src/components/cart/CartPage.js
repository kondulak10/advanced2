import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as cartActions from '../../actions/cartActions';
import ItemCartRow from '../item/ItemCartRow';
import toastr from 'toastr';
import cartApi from '../../api/cartApi';
import * as ajaxStatusActions from '../../actions/ajaxStatusActions';

export class CartPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.emptyCart = this.emptyCart.bind(this);
    this.buyCart = this.buyCart.bind(this);
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

  render() {
    return (
      <div>
        <div className=".col-md-12" style={{ width: "400px", margin: "15px 0 0 15px" }}>
          <div className="btn btn-default" onClick={this.emptyCart}>
            Empty cart
          </div>
          {
            Object.keys(this.props.state.user).length !=0 &&

          <div className="btn btn-default" onClick={this.buyCart}>
            Buy cart
          </div>
          }
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
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
