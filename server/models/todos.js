var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  note: String,
  updated_at: {
    type: Date,
    default: Date.now
  },
  accessLevel: {
    type: String,
    enum: ['private', 'public'],
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('toDo', TodoSchema);
