import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as itemActions from '../../actions/itemActions';
import * as ajaxStatusActions from '../../actions/ajaxStatusActions';
import ItemCartRow from './ItemCartRow';
import ItemView from './ItemView';

export class ItemsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      items: [],
      filter: "",
      price: 99999,
      search: ""
    };
    this.update = this.update.bind(this);
    this.getFilteredItems = this.getFilteredItems.bind(this);
    this.search = this.search.bind(this);
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
      return this.setState({ price: parseFloat(event.target.value) });
    }
    else if (field === "search") {
      return this.setState({ search: event.target.value });
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

      if (price <= this.state.price || isNaN(this.state.price)) {
        //check brand
        if (typeof this.state.filter === "undefined" || i.brand.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0 || this.state.filter === "") {
          filtered.push(i);
        }
      }
    }
    return filtered;
  }

  search() {
    this.props.actions.getSearch(this.state.search).then(r => {
      console.log("Get data filtered", this.props.state.items);
      this.setState({
        items: this.props.state.items
      })
    }).catch(r => {
    })
  }

  render() {
    return (
      <div>


        <div className="row" style={{ marginLeft: "5px" }}>
          <div className="col s12 m5 l4">
            <div className="card-panel teal grey lighten-4">
              <h3 style={{ margin: "0 0 20px 0" }}>Search</h3>
              <div className="row">
                <div className="col s6">
                  <span className="input-group-addon">Items</span>
                  <input type="text" value={this.state.search} name="search" placeholder="Search items" onChange={this.update} />
                </div>
                <div className="col s6">
                  <div className="btn searchButton" onClick={this.search}>
                    Search
                </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col s12 m5 l4">
            <div className="card-panel teal grey lighten-4">
              <h3 style={{ margin: "0 0 20px 0" }}>Filter</h3>
              <div className="row">
                <div className="col s6">
                  <span className="input-group-addon">Brand</span>
                  <input type="text" name="filter" placeholder="Filter brand" onChange={this.update} />
                </div>
                <div className="col s6">
                  <span className="input-group-addon">Price</span>
                  <input type="number" name="price" placeholder="Max price" onChange={this.update} />
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className=".col-md-12" style={{ marginLeft: "5px" }}>

          <div className="row">
            {
              this.state.items && this.getFilteredItems().map(item =>
                <ItemView key={item._id} item={item} addToCart={true} link={true}></ItemView>
              )
            }
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
    actions: bindActionCreators(itemActions, dispatch),
    ajaxStatusActions: bindActionCreators(ajaxStatusActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage)
