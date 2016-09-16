module.exports = function(app) {
  require('./todos')(app);
  require('./users')(app);

  app.get('/', function(req, res) {
    res.send({ message: 'Welcome to my API' });
  });
};
