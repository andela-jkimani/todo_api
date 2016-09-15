var Todo = require('./model');

module.exports = {
  create: function(req, res) {
    var todo = new Todo();

    todo.name = req.body.name;
    todo.completed = req.body.completed;
    todo.note = req.body.note;
    todo.updated_at = req.body.updated_at;

    todo.save(function(err) {
      if (err) {
        console.log(err);
        res.status(200).send();
      } else {
        res.send({ success: true, message: 'Todo saved successfuly' });
      }
    });
  },

  readAll: function(req, res, next) {
    Todo.find(function(err, todo) {
      if (err) return next(err);
      return res.json(todo);
    });
  },

  readOne: function(req, res) {
    Document.findOne({ name: req.params.name }, function(err, todo) {
      if (err) {
        res.status(404).send({ message: 'ToDo not found' });
      }
      return res.send(todo);
    });
  }
};
