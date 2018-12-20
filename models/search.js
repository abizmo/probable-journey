const mongoose = require('mongoose');
const searchSchema = mongoose.Schema({
  term: {
    type: String,
    required: true
  },
  when: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Search', searchSchema);