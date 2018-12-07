const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserMesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  message: {
    type: String,
    required: true
  },
  isLook: {
    type: Number,
    default: 0
  }
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});

module.exports = UserMes = mongoose.model('usermes', UserMesSchema);
