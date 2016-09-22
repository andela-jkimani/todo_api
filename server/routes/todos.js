module.exports = function(app) {
  var Todo = require('../controllers/todos');
  var User = require('../controllers/users');

  app.route('/todos')
    .get(User.authenticate, Todo.getAll)
    .post(User.authenticate, Todo.create);

  app.route('/todos/:id')
    .get(User.authenticate, Todo.getOne)
    .put(User.authenticate, Todo.update)
    .delete(User.authenticate, Todo.delete);

  // app.get('/todos/limit/:limit', Todo.readByLimit);
  app.get('/todos/users/:users', User.authenticate, Todo.getByUser);
};
