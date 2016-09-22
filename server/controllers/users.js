var User = require('../models/users');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var bcrypt = require('bcrypt');

module.exports = {
  create: function(req, res) {
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = req.body.role;

    user.save(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.json({ success: true, message: 'User successfully created' });
      }
    });
  },

  login: function(req, res) {
    User.findOne({
      name: req.body.name
    }, function(err, user) {
      if (err) {
        res.send(err);
      } else if (!user) {
        res.send({ success: false, message: 'User not found' });
      } else {
        bcrypt.compare(req.body.password, user.password, function() {
          if (err) {
            res.send(err);
          } else if (!user.password) {
            res.send({ success: false, message: 'Incorrect password' });
          } else {
            var token = jwt.sign(user, config.secret, {
              expiresIn: 1440 // 24 hours
            });
            res.json({
              success: true,
              message: 'Successfully authenticated!',
              token: token
            });
          }
        });
      }
    });
  },

  authenticate: function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          res.json({ success: false, message: 'Token authentication failed' });
        } else {
          res.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided'
      });
    }
  },

  getAll: function(req, res) {
    User.find(function(err, user) {
      if (err) {
        res.status(404).send();
      }
      return res.json(user);
    });
  },

  // getAll: function(req, res) {
  //
  // },

  getOne: function(req, res) {
    User.findOne({ _id: req.params.id }, function(err, user) {
      if (err) {
        res.status(404).send();
      }
      res.json(user);
    });
  },

  getByRole: function(req, res) {
    User.find({ role: req.params.role }, function(err, users) {
      if (err) {
        res.send(err);
      } else {
        res.json(users);
      }
    });
  },

  update: function(req, res) {
    User.findByIdAndUpdate({ _id: req.params.id },
      { $set: req.body }, function(err, user) {
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

  // logout: function(req, res) {
  //   delete req.decoded;
  //   if (req.decoded) {
  //     res.send({ success: false, message: 'Did not logout' });
  //   } else {
  //     res.send({ success: true, message: 'Successfully logged out' });
  //   }
  // }
};
