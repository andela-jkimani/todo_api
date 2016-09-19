module.exports = function(app) {
  var User = require('../controllers/users');

  app.route('/users')
    .get(User.getAll)
    .post(User.create);

  app.route('/users/:id')
    .get(User.getOne)
    .put(User.update)
    .delete(User.delete);

  app.post('/users/authenticate', User.authenticate);

  // app.post('/users/login', User.logIn);
};
