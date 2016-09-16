var User = require('../models/users');

module.exports = {
  create: function(req, res) {
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function(err) {
      if (err) {
        console.log(err);
        res.status(200).send();
      } else {
        res.json({ success: true, message: 'User successfully created' });
      }
    });
  },

  getAll: function(req, res) {
    User.find(function(err, user) {
      if (err) {
        res.status(404).send();
      }
      return res.json(user);
    });
  },

  getOne: function(req, res) {
    User.findById({ _id: req.params.id }, function(err, user) {
      if (err) {
        res.status(404).send();
      }
      res.json(user);
    });
  },

  update: function(req, res) {
    User.findByIdAndUpdate({ _id: req.params.id },
      { $set: { name: req.body.name } }, function(err, user) {
        user.save(function() {
          if (err) {
            res.status(404).send();
          }
          return res.json({ success: true, message: 'User successfully updated' });
        });
      });
  },

  delete: function(req, res) {
    User.findByIdAndRemove({ _id: req.params.id }, function(err) {
      if (err) {
        res.status(404).send();
      }
      return res.json({ success: true, message: 'User successfully deleted' });
    });
  }
};
