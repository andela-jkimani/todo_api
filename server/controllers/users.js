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

  logIn: function(req, res) {
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
            message: 'Successfully authenticated!',
            token: token
          });
        }
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
