const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MonthFileSchema = new Schema({
  area: {
    type: String,
    required: true
  },
  janEle: {
    type: String
  },
  febEle: {
    type: String
  },
  marEle: {
    type: String
  },
  aprEle: {
    type: String
  },
  mayEle: {
    type: String
  },
  junEle: {
    type: String
  },
  julEle: {
    type: String
  },
  augEle: {
    type: String
  },
  sepEle: {
    type: String
  },
  octEle: {
    type: String
  },
  novEle: {
    type: String
  },
  decEle: {
    type: String
  },
  janMoney: {
    type: String
  },
  febMoney: {
    type: String
  },
  marMoney: {
    type: String
  },
  aprMoney: {
    type: String
  },
  mayMoney: {
    type: String
  },
  junMoney: {
    type: String
  },
  julMoney: {
    type: String
  },
  augMoney: {
    type: String
  },
  sepMoney: {
    type: String
  },
  octMoney: {
    type: String
  },
  novMoney: {
    type: String
  },
  decMoney: {
    type: String
  }
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}})

module.exports = MonthFile = mongoose.model('monthfile', MonthFileSchema)