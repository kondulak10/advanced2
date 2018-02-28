import * as itemApi from './itemApi';
import * as userApi from './userApi';
import * as cartApi from './cartApi';

var bcrypt = require('bcrypt');
import { saltRounds } from './../srcServer';

module.exports = function (app, jwt, secretkey) {

  //item
  app.get('/api/items/all', function (req, res) {
    itemApi.getAll(req, res);
  });

  app.post('/api/items/search', function (req, res) {
    itemApi.getSearch(req, res);
  });

  app.post('/api/items/create', verifyToken, function (req, res) {
    console.log("Create post", req.admin)
    if (req.admin) {
      itemApi.createItem(req, res);
    }
    else {
      console.log("not admin");
      res.sendStatus(403);
    }
  });

  app.post('/api/items/getById', function (req, res) {
    itemApi.getItemById(req, res);
  });

  app.post('/api/items/update', verifyToken, function (req, res) {
    if (req.admin) {
      itemApi.updateItem(req, res);
    }
    else {
      console.log("not admin");
      res.sendStatus(403);
    }
  });

  app.post('/api/items/delete', verifyToken, function (req, res) {
    if (req.admin) {
      itemApi.deleteItem(req, res);
    }
    else {
      console.log("not admin");
      res.sendStatus(403);
    }
  });

  app.post('/api/items/deleteAll', verifyToken, function (req, res) {
    if (req.admin) {
      itemApi.deleteAll(req, res);
    }
    else {
      console.log("not admin");
      res.sendStatus(403);
    }
  });

  //user
  app.get('/api/users/all', verifyToken, function (req, res) {
    if (req.admin) {
      userApi.getAll(req, res);
    }
    else {
      console.log("not admin");
      res.sendStatus(403);
    }
  });

  app.post('/api/users/create', function (req, res) {
    userApi.createItem(req, res);
  });

  app.post('/api/users/getById', verifyToken, function (req, res) {
    if (req.admin) {
      userApi.getItemById(req, res);
    }
    else {
      console.log("not admin");
      res.sendStatus(403);
    }
  });

  app.post('/api/users/update', verifyToken, function (req, res) {
    if (req.admin) {
      userApi.updateItem(req, res);
    }
    else {
      console.log("not admin");
      res.sendStatus(403);
    }
  });

  app.post('/api/users/delete', verifyToken, function (req, res) {
    if (req.admin) {
      userApi.deleteItem(req, res);
    }
    else {
      console.log("not admin");
      res.sendStatus(403);
    }
  });

  app.post('/api/users/deleteAll', verifyToken, function (req, res) {
    if (req.admin) {
      userApi.deleteAll(req, res);
    }
    else {
      console.log("not admin");
      res.sendStatus(403);
    }
  });

  app.post("/api/buyCart", verifyToken, function (req, res) {
    cartApi.buyCart(req, res);
  });

  app.get('/api/cart/all', verifyToken, function (req, res) {
    if (req.admin) {
      cartApi.getAll(req, res);
    }
    else {
      console.log("not admin");
      res.sendStatus(403);
    }
  });

  app.get('/api/cart/deleteAll', verifyToken, function (req, res) {
    if (req.admin) {
      cartApi.deleteAll(req, res);
    }
    else {
      console.log("not admin");
      res.sendStatus(403);
    }
  });

  app.get("/api/createAdmin", function(req,res) {
    userApi.createAdmin(req,res);
  })

  app.post("/api/users/login", (req, res) => {
    const User = userApi.Item;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }, (err, user) => {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          login(req, res, user);
        }
        else {
          res.sendStatus(403);
        }
      });
    })

  })

  app.post("/api/users/useToken", (req, res) => {
    console.log("Checking token");
    const User = userApi.Item;
    const token = req.body.token;
    User.findOne({ token }, (err, user) => {
      login(req, res, user);
    });
  })

  function login(req, res, user) {
    const User = userApi.Item;
    if (user) {
      user.token = "";
      jwt.sign({ user }, secretkey, (err, token) => {
        User.update({ email: user.email }, { token }, (err, userMod) => {
          res.json({
            token,
            user
          })
        })
      });
    }
    else {
      console.log("User not found")
      res.sendStatus(403);
    }
  }

  function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      jwt.verify(req.token, secretkey, (err, authData) => {
        if (err) {
          res.sendStatus(403);
        }
        else {
          if (authData.user.admin) {
            req.admin = true;
          }
          else {
            req.admin = false;
          }
          req.authData = authData;
          next();
        }
      });
    }
    else {
      res.sendStatus(403);
    }
  }

}

