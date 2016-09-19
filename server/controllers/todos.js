var Todo = require('../models/todos');

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
    Todo.findById({ _id: req.params.id }, function(err, todo) {
      if (err) {
        res.status(404).send({ message: err });
      }
      return res.json(todo);
    });
  },

  update: function(req, res) {
    // console.log(req)
    Todo.findByIdAndUpdate({ _id: req.params.id },
      { $set: { note: req.body.note } }, function(err, todo) {
        todo.save(function() {
          if (err) res.status(404).send();
          return res.json({ success: true, message: 'Todo updated successfully' });
        });
      });
  },

  delete: function(req, res) {
    Todo.findByIdAndRemove({ _id: req.params.id }, function(err) {
      if (err) {
        res.status(404).send();
      }
      return res.json({ success: true, message: 'Todo successfully deleted' });
    });
  }
};
