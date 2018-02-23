import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as cartActions from '../../actions/cartActions';
import toastr from "toastr"
import { Link, IndexLink } from "react-router";

export class ItemCartRow extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      item: this.props.item,
      addToCart: this.props.addToCart,
      quantity: this.props.quantity,
      link: this.props.link,
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
        {this.state.link &&
          <td>
            <Link to={"updateItem/"+this.state.item.id}>{this.state.item.name}</Link>
          </td>
        }
        {!this.state.link &&
          <td>{this.state.item.name}</td>
        }
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
