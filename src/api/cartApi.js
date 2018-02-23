import * as itemApi from "./itemApi";
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
      if (i._id === item._id) {
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
        itemApi.getAll().then(items=>{

          var price = 0;
          var finalCart = []; //final cart with extra pay/get
          for (let c of cart) {
            var c = Object.assign({}, c);
            for (let i of items) {
              var i = Object.assign({}, i);
              if (c._id === i._id) {
                //compute discount
                if (c.discount !== 0) {
                  var multiplier = i.discount / 100;
                  var discount = i.price * multiplier;
                  c.processedPrice = i.price - discount;
                }
                else {
                  c.processedPrice = i.price;
                }
                price += c.quantity * c.processedPrice;
                //multi
                var extra = false;
                if (i.pay !== 1 && i.get !== 1) {
                  //how many times it gets
                  if (c.quantity >= i.pay) {
                    extra = true;
                    //pay: 2
                    //get: 4
                    //quantity: 4
                    var times = parseInt(c.quantity / i.pay);
                    var original = c.quantity;
                    var extra = i.get * times;
                    var remaining = original - (i.pay * times);
                    var final = extra + remaining;
                    for (var y = 0; y < final; y++) {
                      finalCart.push(c);
                    }
                  }
                  if (!extra) {
                    for (var y = 0; y < c.quantity; y++) {
                      finalCart.push(c);
                    }
                  }

                  // if (c.quantity >= i.pay) {
                  //   for (var y = 0; y < i.get - c.quantity; y++) {
                  //     finalCart.push(c);
                  //   }
                  // }
                }
              }
            }
          }

          console.log("Final", finalCart, price);


          if (price > 0) {
            resolve([finalCart, price]);
          }
          else {
            reject("Price is 0")
          }

        });
      }, delay)
    });
  }

}

export default cartApi;
