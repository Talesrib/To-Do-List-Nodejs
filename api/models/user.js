const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Number,
        default: 0
    },
    password: {
        type: String, 
        required: true
    }
  });
  
  module.exports = mongoose.model('User', UserSchema);