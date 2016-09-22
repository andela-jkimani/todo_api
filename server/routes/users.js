module.exports = function(app) {
  var User = require('../controllers/users');

  app.route('/users')
    .get(User.getAll)
    .post(User.create);

  app.route('/users/:id')
    .get(User.authenticate, User.getOne)
    .put(User.authenticate, User.update)
    .delete(User.authenticate, User.delete);

  app.post('/users/logIn', User.login);
  // app.get('/users/logout', User.logout);

  app.get('/users/roles/:role', User.authenticate, User.getByRole);
};
