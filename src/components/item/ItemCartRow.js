import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as cartActions from '../../actions/cartActions';
import toastr from "toastr"

export class ItemCartRow extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      item: this.props.item,
      addToCart: this.props.addToCart,
      quantity: this.props.quantity
    }
    this.addToCart = this.addToCart.bind(this);
    this.computePrice = this.computePrice.bind(this);
    this.getOffer = this.getOffer.bind(this);
  }

  addToCart() {
    this.props.actions.addToCart(this.state.item);
    toastr.success("Item added to cart");
  }

  computePrice() {
    if (this.state.item.discount !== 0) {
      var multiplier = this.state.item.discount / 100;
      var discount = this.state.item.price * multiplier;
      return (this.state.item.price - discount) + " (" + this.state.item.discount + "%)";
    }
    else {
      return this.state.item.price;
    }
  }

  getOffer() {
    if (this.state.item.pay !== 1 && this.state.item.get !== 1) {
      return this.state.item.get + " for " + this.state.item.pay;
    }
    else {
      return "-";
    }
  }

  render() {
    return (
      <tr>
        <td>{this.state.item.id}</td>
        <td>{this.state.item.name}</td>
        <td>{this.state.item.brand}</td>
        <td>
        {this.computePrice()}
        </td>
        <td>
        {this.getOffer()}
        </td>
        {this.state.addToCart &&
          <td onClick={this.addToCart}>Add</td>
        }
        {this.state.quantity &&
          <td>{this.state.item.quantity}</td>
        }
      </tr>
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemCartRow)
