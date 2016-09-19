var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var routes = require('./server/routes');
var morgan = require('morgan');
var config = require('./server/config/config');

app.use(morgan('dev'));

mongoose.connect(config.database);
mongoose.Promise = global.Promise;
app.set('mySecret', config.secret);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('API is at port ', port);
});
