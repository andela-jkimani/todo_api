var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user']
  }
});

userSchema.pre('save', function(done) {
  this.password = bcrypt.hashSync(this.password, 10);
  done();
});

module.exports = mongoose.model('User', userSchema);
