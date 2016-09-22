var Todo = require('../models/todos');

module.exports = {
  create: function(req, res) {
    var todo = new Todo();

    todo.name = req.body.name;
    todo.completed = req.body.completed;
    todo.note = req.body.note;
    todo.updated_at = req.body.updated_at;
    todo.accessLevel = req.body.accessLevel;

    todo.save(function(err) {
      if (err) {
        res.status(404).send(err);
      } else {
        res.send({ success: true, message: 'Todo saved successfuly' });
      }
    });
  },

  // readByLimit: function(req, res) {
  //   Todo.find({})
  //   .limit(Number(req.params))
  //   .sort({ name: -1 })
  //   .exec(function(err, users) {
  //     if (err) {
  //       res.send(err);
  //     } else {
  //       return res.json(users);
  //     }
  //   });
  // },

  getAll: function(req, res, next) {
    Todo.find(function(err, todo) {
      if (err) return next(err);
      return res.json(todo);
    });
  },

  getOne: function(req, res) {
    Todo.findById({ _id: req.params.id }, function(err, todo) {
      if (err) {
        res.status(404).send({ message: err });
      }
      return res.json(todo);
    });
  },

  getByUser: function(req, res) {
    Todo.find({ ownerId: req.params.ownerId }, function(err, documents) {
      if (err) {
        res.send(err);
      } else {
        res.send(documents);
      }
    });
  },

  // authAccess: function(req, res) {
  // },

  update: function(req, res) {
    // console.log(req)
    Todo.findByIdAndUpdate({ _id: req.params.id },
      { $set: req.body }, function(err, todo) {
        todo.save(function() {
          if (err) res.status(404).send(err);
          return res.json({ success: true, message: 'Todo updated successfully' });
        });
      });
  },

  delete: function(req, res) {
    Todo.findByIdAndRemove({ _id: req.params.id }, function(err) {
      if (err) {
        res.status(404).send(err);
      }
      return res.json({ success: true, message: 'Todo successfully deleted' });
    });
  }
};
