import { isFilled, isInt } from '../helpers/helpers';

var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  name: String,
  price: Number,
  brand: String,
  discount: Number,
  pay: Number,
  receive: Number
});
export const Item = mongoose.model('Item', itemSchema);

export function createItem(req, res) {
  const i = req.body;
  if (!(
    isFilled(i.name) && isFilled(i.price) && isFilled(i.brand) &&
    isFilled(i.discount) && isFilled(i.pay) && isFilled(i.receive)
    && isInt(i.price) && isInt(i.discount) && isInt(i.pay) && isInt(i.receive) &&
    i.pay <= i.receive && i.pay > 0 && i.receive > 0
  )) {
    res.sendStatus(403); res.end();
  }
  else {
    var item = new Item(req.body);
    item.save((err, item) => {
      res.json({ saved: true, item: item });
    })
  }
}

export function getAll(req, res) {
  Item.find((err, items) => {
    res.json({ items: items });
  })
}

export function getSearch(req, res) {
  var search = req.body.search;
  Item.find({ name: new RegExp(search, "i") }, (err, items) => {
    res.json({ items: items });
  })
}

export function getItemById(req, res) {
  console.log(req.body);
  var id = req.body.id;
  Item.findById(id, (err, item) => {
    res.json({ saved: true, item: item });
  })
}

export function updateItem(req, res) {
  var item = new Item(req.body);
  var id = req.body._id;
  var i = req.body;
  if (!(
    isFilled(i.name) && isFilled(i.price) && isFilled(i.brand) &&
    isFilled(i.discount) && isFilled(i.pay) && isFilled(i.receive)
    && isInt(i.price) && isInt(i.discount) && isInt(i.pay) && isInt(i.receive) &&
    i.pay <= i.receive && i.pay > 0 && i.receive > 0
  )) {
    res.sendStatus(403); res.end();
  }
  else {
    Item.findOneAndUpdate({ _id: id }, item, { upsert: false }, (err, item) => {
      res.json({ saved: true, item: item });
    })
  }
}

export function deleteAll(req, res) {
  Item.deleteMany({}, () => {
    res.json({ message: "deleted" });
  })
}

export function deleteItem(req, res) {
  var id = req.body.id;
  Item.findOneAndRemove({ _id: id }, (err, item) => {
    res.json({ done: true });
  })
}
