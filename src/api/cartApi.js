import * as itemApi from "./mock/mockItemApi";
import delay from './delay';

class cartApi {
  //get all items
  static getAll() {
    if (localStorage.getItem("cart")) {
      var items = eval(localStorage.getItem("cart"));
      return items;
    }
    else {
      return [];
    }
  }


  //create item
  static addToCart(item) {
    var item = Object.assign({}, item);
    var items = [];
    if (localStorage.getItem("cart")) {
      items = eval(localStorage.getItem("cart"));
    }
    //check if exists
    var found = false;
    check: for (let i of items) {
      if (i.id === item.id) {
        found = true;
        i.quantity++;
        break check;
      }
    }
    if (!found) {
      item["quantity"] = 1;
      items.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(items));
    return items;
  }

  //empty cart
  static deleteCart() {
    localStorage.setItem("cart", "");
    return [];
  }


  //buy cart
  static buyCart(cart) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var items = itemApi.items;
        var price = 0;
        for (let c of cart) {
          for (let i of items) {
            if (c.id === i.id) {
              price += c.quantity * i.price;
            }
          }
        }
        resolve(price);
      }, delay)
    });
  }

}

export default cartApi;
