const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const SysNoticeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }

}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});

module.exports = SysNotice = mongoose.model('sysnotice', SysNoticeSchema);
