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
    var item = Object.assign({},item);
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

}

export default cartApi;
