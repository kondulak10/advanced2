import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as itemActions from '../../actions/itemActions';
import ItemCartRow from './ItemCartRow';

export class ItemsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      items: [],
      filter: "",
      price: 99999
    };
    this.update = this.update.bind(this);
    this.getFilteredItems = this.getFilteredItems.bind(this);
  }

  //get initial data
  componentDidMount() {
    this.props.actions.getAll().then(r => {
      console.log("Get data", this.props.state.items);
      this.setState({
        items: this.props.state.items
      })
    }).catch(r => {
    })
  }

  //filter state changed
  componentDidUpdate() {
    this.getFilteredItems();
  }

  //called from filter inputs
  update(event) {
    const field = event.target.name;
    if (field === "filter") {
      return this.setState({ filter: event.target.value });
    }
    else if (field === "price") {
      return this.setState({ price: parseInt(event.target.value) });
    }
  }

  //filter functions
  getFilteredItems() {
    var items = this.state.items;
    var filtered = [];
    for (let i of items) {
      //check price
      var price;
      if (i.discount !== 0) {
        var multiplier = i.discount / 100;
        var discount = i.price * multiplier;
        price = i.price - discount;
      }
      else {
        price = i.price;
      }

      if (price < this.state.price || isNaN(this.state.price)) {
        //check name
        if (i.name.indexOf(this.state.filter) >= 0 || this.state.filter === "") {
          filtered.push(i);
        }
      }
    }
    return filtered;
  }

  render() {
    return (
      <div className=".col-md-12" style={{ width: "400px", margin: "15px 0 0 15px" }}>
        <input type="text" name="filter" placeholder="Search name" onChange={this.update} />
        <input type="number" name="price" placeholder="Max price" onChange={this.update} />
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Special offer</th>
              <th>Cart</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.items && this.getFilteredItems().map(item =>
                <ItemCartRow key={item.id} item={item} addToCart={true} link={true}></ItemCartRow>
              )
            }
          </tbody>
        </table>
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
    actions: bindActionCreators(itemActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage)
