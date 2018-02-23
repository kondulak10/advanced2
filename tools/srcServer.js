import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import * as itemApi from '../src/api/itemApi';
import * as userApi from '../src/api/userApi';

//DB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/27017');
var db = mongoose.connection;
db.on('error', function () {
  console.log("Mongo error!");
});
db.once('open', function () {
  console.log("Mongo working!");
});


/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});

//APIs
//item
app.get('/api/items/all', function (req, res) {
  itemApi.getAll(req, res);
});

app.post('/api/items/create', function (req, res) {
  itemApi.createItem(req, res);
});

app.post('/api/items/getById', function (req, res) {
  itemApi.getItemById(req, res);
});

app.post('/api/items/update', function (req, res) {
  itemApi.updateItem(req, res);
});

app.post('/api/items/delete', function (req, res) {
  itemApi.deleteItem(req, res);
});

app.post('/api/items/deleteAll', function (req, res) {
  itemApi.deleteAll(req, res);
});

//user
app.get('/api/users/all', function (req, res) {
  userApi.getAll(req, res);
});

app.post('/api/users/create', function (req, res) {
  userApi.createItem(req, res);
});

app.post('/api/users/getById', function (req, res) {
  userApi.getItemById(req, res);
});

app.post('/api/users/update', function (req, res) {
  userApi.updateItem(req, res);
});

app.post('/api/users/delete', function (req, res) {
  userApi.deleteItem(req, res);
});

app.post('/api/users/deleteAll', function (req, res) {
  userApi.deleteAll(req, res);
});

app.post('/api/users/login', function (req, res) {
  userApi.login(req, res);
});






app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});
