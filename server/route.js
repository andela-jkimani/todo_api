module.exports = function(app) {
  var Todo = require('./controller');

  app.route('/todos')
    .get(Todo.readAll)
    .post(Todo.create);
};
