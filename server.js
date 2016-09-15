var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var routes = require('./server/route');
var morgan = require('morgan');

app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/todo_api');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen(3000, function() {
  console.log('API is at port 3000');
});

app.get('/', function(req, res) {
  res.send({ message: 'Welcome to my todo api' });
});
