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
  }

  addToCart() {
    this.props.actions.addToCart(this.state.item);
    toastr.success("Item added to cart");
  }

  render() {
    return (
      <tr>
        <td>{this.state.item.id}</td>
        <td>{this.state.item.name}</td>
        <td>{this.state.item.brand}</td>
        <td>{this.state.item.price}</td>
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
