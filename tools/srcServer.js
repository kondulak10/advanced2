import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import * as itemApi from './api/itemApi';
import * as userApi from './api/userApi';

//secret key
const secretkey = "secret123ABC!@#";

//DB
var mongoose = require('mongoose');
//mongoose.connect("mongodb://localhost/27017"); //local db
mongoose.connect(process.env.mongoUrl);

var db = mongoose.connection;
db.on('error', function () {
  console.log("Mongo error!");
});
db.once('open', function () {
  console.log("Mongo working!");
});


/* eslint-disable no-console */

const port = process.env.PORT;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

//router body
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    //open(`http://0.0.0.0:${port}`);
    open(`http://localhost:${port}`);
    console.log("Runnint at", `http://0.0.0.0:${port}`)
  }
});

//LOGIN
const jwt = require("jsonwebtoken")

require("./api/routes")(app, jwt, secretkey);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});
