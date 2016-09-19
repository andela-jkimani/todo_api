var User = require('../models/users');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

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

  // logIn: function(req, res) {
  //   User.findOne({
  //     email: req.body.email
  //   }), function(err, user) {
  //     if (err) throw err;
  //     if (!user) {
  //       res.send({ success: false, message: 'User not found' });
  //     } else {
  //       console.log('Now logging in...');
  //       if (req.body.password === user.password) {
  //         res.json({ success: true, message: 'Successfully logged in' });
  //       } else {
  //         res.json({ success: true, message: 'Log in failed' });
  //       }
  //     }
  //   };
  // },

  authenticate: function(req, res) {
    User.findOne({
      name: req.body.name
    }, function(err, user) {
      if (err) throw err;
      if (!user) {
        res.json({ success: false, message: 'User not found' });
      } else if (user) {
        if (user.password !== req.body.password) {
          res.json({ success: false, message: 'Incorrect password' });
        } else {
          var token = jwt.sign(user, config.secret, {
            expiresIn: 1440 // 24 hours
          });
          res.json({
            success: true,
            message: 'Enjoy your token',
            token: token
          });
        }
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
