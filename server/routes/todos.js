module.exports = function(app) {
  var Todo = require('../controllers/todos');

  app.route('/todos')
    .get(Todo.readAll)
    .post(Todo.create);

  app.route('/todos/:id')
    .get(Todo.readOne)
    .put(Todo.update)
    .delete(Todo.delete);
};
