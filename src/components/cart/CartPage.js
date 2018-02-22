import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as cartActions from '../../actions/cartActions';
import ItemCartRow from '../item/ItemCartRow';
import toastr from 'toastr';

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
    //server side
    var price = 0;
    for (let i of this.props.state.cart) {
      price += i.quantity * i.price;
    }
    alert("Bought " + price + "NOK");
    this.props.actions.deleteCart();
    toastr.success("Cart bought")
  }

  render() {
    return (
      <div>
        <div className=".col-md-12" style={{ width: "400px", margin: "15px 0 0 15px" }}>
          <div className="btn btn-default" onClick={this.emptyCart}>
          Empty cart
          </div>
          <div className="btn btn-default" onClick={this.buyCart}>
          Buy cart
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.state.cart && this.props.state.cart.map(item =>
                  <ItemCartRow key={item.id} item={item} quantity={true}></ItemCartRow>
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
    actions: bindActionCreators(cartActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
