var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  email: String,
  password: String,
  admin: Boolean,
  token: String
});

export const Item = mongoose.model('User', itemSchema);

export function createItem(req, res) {
  var item = new Item(req.body);
  //check
  //res.status(403).send({ error: true });
  //return;
  var email = req.body.email;
  Item.find({ email: email }, (err, items) => {
    if (items.length == 0) {
      //admin
      //item.admin = true;
      item.save((err, item) => {
        res.json({ saved: true, item: item });
      })
    }
    else {
      res.status(403).send({ error: true, message: "Email exists" });
    }
  });


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
  Item.findOneAndUpdate({ _id: id }, item, { upsert: true }, (err, item) => {
    if (err || !item) {
      res.json({ message: "deleted" });
      return;
    }
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

