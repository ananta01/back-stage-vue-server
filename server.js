const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')

// 引入路由
const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')
const monthfile = require('./routes/api/monthfile')
const usermes = require('./routes/api/usermes')


const {connect} = require('./config/init')

;(function () {
  connect()
})()

// 使用body-parser中间件(需要在routes前面先注册)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// passport初始化
app.use(passport.initialize())
// 把passport传递过去
require('./config/passport')(passport)

// 使用routes
app.use('/api/users', users)
app.use('/api/profiles', profiles)
app.use('/api/monthfiles', monthfile)
app.use('/api/usermes', usermes)

const port = process.env.PORT || 8082

app.listen(port, () => {
  console.log(`Server is starting on port: ${port}`);
})