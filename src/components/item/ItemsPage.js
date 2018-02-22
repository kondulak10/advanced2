import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as itemActions from '../../actions/itemActions';
import ItemCartRow from './ItemCartRow';

export class ItemsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      filter: "",
      price: 99999
    };
    this.update = this.update.bind(this);
    this.getFilteredItems = this.getFilteredItems.bind(this);
  }

  //get initial data
  componentDidMount() {
    console.log("Get data");
    this.props.actions.getAll().then(r => {
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
    var items = this.props.state.items;
    var filtered = [];
    for (let i of items) {
      //check price
      if (i.price < this.state.price || isNaN(this.state.price)) {
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
              <th>Cart</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.state.items && this.getFilteredItems().map(item =>
                <ItemCartRow key={item.id} item={item} addToCart={true}></ItemCartRow>
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
