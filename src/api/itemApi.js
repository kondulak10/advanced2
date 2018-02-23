var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  name: String,
  price: Number,
  brand: String,
  discount: Number,
  pay: Number,
  receive: Number
});
var Item = mongoose.model('Item', itemSchema);

export function createItem(req, res) {
  var item = new Item(req.body);
  //check
  //res.status(403).send({ error: true });
  //return;
  item.save((err, item) => {
    res.json({ saved: true, item: item });
  })

}

export function getAll(req, res) {
  Item.find((err, items) => {
    res.json({ items: items });
  })
}

export function getItemById(req, res) {
  var id = req.body.id;
  Item.findById(id, (err, item) => {
    res.json({ saved: true, item: item });
  })
}

export function updateItem(req, res) {
  var item = new Item(req.body);
  var id = req.body.id;
  Item.findOneAndUpdate({ _id: id }, item, { upsert: false }, (err, item) => {
    res.json({ saved: true, item: item });
  })
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
