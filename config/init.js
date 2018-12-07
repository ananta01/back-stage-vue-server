const mongoose = require('mongoose')
const db = 'mongodb://localhost/back-vue'

exports.connect = () => {

  let maxConnectCount = 0

  // 连接数据库
  mongoose.connect(db, { useNewUrlParser: true })

  return new Promise((resolve, reject) => {

    // 增加数据库监听事件
    mongoose.connection.on('disconnected', () => {
      console.log('**********数据库断开**********');
      ifMaxConnectCount(db)
    })

    mongoose.connection.on('error', (err) => {
      console.log('**********数据库错误**********');
      ifMaxConnectCount(db, err)
    })

    // 链接打开的时候
    mongoose.connection.once('open', () => {
      console.log('MongoDB connected successfully!');
    })

    // 判断最大重连数
    function ifMaxConnectCount(db, err = '') {
      if (maxConnectCount < 3) {
        maxConnectCount++
        mongoose.connect(db)
      } else {
        reject(err)
        throw new Error('数据库出现问题，程序无法访问')
      }
    }

  })
}