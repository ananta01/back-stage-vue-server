const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProFileSchema = new Schema({
  type: {
    type: String
  },
  desc: {
    type: String
  },
  area: {
    type: String,
    required: true
  },
  expend: {
    type: String,
    required: true
  },
  cash: {
    type: String,
    required: true
  },
  remark: {
    type: String
  }
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}})

module.exports = ProFile = mongoose.model('profile', ProFileSchema)