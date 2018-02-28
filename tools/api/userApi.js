var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

import { saltRounds } from './../srcServer';
import { isFilled, isEmail } from './../helpers/helpers';

var itemSchema = mongoose.Schema({
  email: String,
  password: String,
  admin: Boolean,
  token: String
});

export const Item = mongoose.model('User', itemSchema);

export function createItem(req, res) {
  var item = new Item(req.body);
  if (!req.body) {
    res.sendStatus(403); res.end();
  }
  else if (!(isEmail(req.body.email) && isFilled(req.body.email) && isFilled(req.body.password) && !req.body.admin && !req.body.token)) {
    res.sendStatus(403); res.end();
  }
  else {
    var email = req.body.email;
    Item.find({ email: email }, (err, items) => {
      if (items.length == 0) {
        //admin
        item.admin = false;
        bcrypt.hash(item.password, saltRounds, function (err, hash) {
          item.password = hash;
          item.save((err, item) => {
            res.json({ saved: true, item: item });
          })
        });
      }
      else {
        res.sendStatus(403); res.end();
      }
    });
  }
}

export function doInit(req, res) {
  var item = new Item({
    email: "admin@admin.admin",
    password: "admin",
    admin: true
  });
  Item.find({ email: item.email }, (err, items) => {
    if (items.length === 0) {
      bcrypt.hash(item.password, saltRounds, function (err, hash) {
        item.password = hash;
        item.save((err, item) => {
        })
      });
    }
  })

  var item2 = new Item({
    email: "user@user.user",
    password: "user",
    admin: false
  });
  Item.find({ email: item2.email }, (err, items) => {
    if (items.length === 0) {
      bcrypt.hash(item.password, saltRounds, function (err, hash) {
        item.password = hash;
        item.save((err, item) => {
        })
      });
    }
  })
  console.log("Init done");
}

export function getAll(req, res) {
  Item.find((err, items) => {
    res.json({ items: items });
  })
}

export function getItemById(req, res) {
  var id = req.body.id;
  Item.findById(id, (err, item) => {
    if (item) {
      res.json({ saved: true, item: item });
    }
    else {
      res.sendStatus(403); res.end();
    }
  })
}

export function updateItem(req, res) {
  var item = new Item(req.body);
  var id = req.body.id;
  Item.findOneAndUpdate({ _id: id }, item, { upsert: true }, (err, item) => {
    if (err || !item) {
      res.sendStatus(403); res.end();
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
    if (err || !item) {
      res.sendStatus(403); res.end();
    }
    else {
      res.json({ done: true });
    }
  })
}

