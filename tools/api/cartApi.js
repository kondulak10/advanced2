import { Item } from './itemApi';
import _ from 'lodash';

var mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
  items: Number,
  price: Number
});
var Cart = mongoose.model('Cart', cartSchema);

export function getAll(req, res) {
  Cart.find((err, items) => {
    res.json({ items: items });
  });
}

export function deleteAll(req, res) {
  Cart.deleteMany({}, () => {
    res.json({ message: "deleted" });
  })
}

export function buyCart(req, res) {
  var cart = req.body;
  Item.find((err, items) => {

    var price = 0;
    var finalCart = []; //final cart with extra pay/get


    for (let c of cart) {
      for (let i of items) {
        if (c._id == i._id) {
          //compute discount
          if (i.discount !== 0) {
            var multiplier = i.discount / 100;
            var discount = i.price * multiplier;
            c.processedPrice = i.price - discount;
          }
          else {
            c.processedPrice = i.price;
          }
          price += c.quantity * c.processedPrice;
          //multi
          var extraBool = false;
          console.log("check", i.pay, i.receive);
          if (i.pay !== 1 && i.receive !== 1) {
            //how many times it gets
            if (c.quantity >= i.pay) {
              extraBool = true;
              var times = parseInt(c.quantity / i.pay);
              var original = c.quantity;
              var extra = i.receive * times;
              var remaining = original - (i.pay * times);
              var final = extra + remaining;
              console.log("Final", final, extra, remaining);
              for (let y = 0; y < final; y++) {
                finalCart.push(c);
              }
            }
            console.log("Extrabool quantty", extraBool, c.quantity);
            if (!extraBool) {
              for (let y = 0; y < c.quantity; y++) {
                finalCart.push(c);
              }
            }
          }
          //normal
          else {
            for (let y = 0; y < c.quantity; y++) {
              finalCart.push(c);
            }
          }
        }
      }
    }
    //final
    var itemize = {};
    itemize.items = finalCart.length;
    itemize.price = price;
    var item = new Cart(itemize);
    item.save((err, item) => {
      res.json({ saved: true, item, finalCart });
    })
  })

}

//test function with lodash
function pasta(items, cart) {
  var arr = _.map(cart, cartRow =>
    _.assign({}, cartRow, _.find(items, { '_id': cartRow._id }))
  );

  var result = _.map(arr, row => {
    row.price = (row.price - (row.price * (row.discount / 100))) * row.quantity;
    if (!_.isNil(row.get)) {
      let extra = row.get * Math.floor(row.quantity / row.pay);
      row.adjustedQuantity = row.quantity + extra;
    }
    return row;
  });

  var ommitedResult = _.map(result, e => _.pick(e, ['_id', 'quantity', 'price', 'adjustedQuantity']));

  var price = 0;
  for (let i of ommitedResult) {
    price += i.quantity * i.price;
  }

  var len = 0;
  for (let i of ommitedResult) {
    len += i.quantity;
  }
  console.log("Pasta", ommitedResult, len, price);
}
