module.exports = function(app) {
  var Todo = require('../controllers/todos');
  var User = require('../controllers/users');

  app.route('/todos')
    .get(User.authenticate, Todo.readAll)
    .post(User.authenticate, Todo.create);

  app.route('/todos/:id')
    .get(User.authenticate, Todo.readOne)
    .put(User.authenticate, Todo.update)
    .delete(User.authenticate, Todo.delete);
};
