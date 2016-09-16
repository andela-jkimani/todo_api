var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var routes = require('./server/routes');
var morgan = require('morgan');

app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/todo_api');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('API is at port ', port);
});
