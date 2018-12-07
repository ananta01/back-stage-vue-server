// login and register
const express = require('express')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const secretOrKey = require('../../config/keys').secretOrKey
const passport = require('passport')

const router = express.Router()

const User = require('../../models/User')

router.get('/test', (req, res) => {
  res.json('hshssh')
})



// 注册  api/users/reg
router.post('/reg', (req, res) => {
  const nowBody = req.body;
  // 查询数据库中是否拥有邮箱
  User.findOne({name: nowBody.name}).then(user => {
    if (user) {
      return res.status(400).json('用户名已存在!');
    } else {
      // 处理头像
      const avatar = gravatar.url(nowBody.email, { s: '200', r: 'pg', d: 'mm'});

      const newUser = new User({
        name: nowBody.name,
        email: nowBody.email,
        avatar,
        password: nowBody.password,
        identity: nowBody.identity
      });

      // 加密
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  })
})

// 登录 api/users/login
router.post('/login', (req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  // 查询数据库
  User.findOne({name})
    .then(user => {
      if (!user) {
        return res.status(404).json('该用户不存在')
      }

      // 匹配密码
      bcrypt.compare(password, user.password, function(err, bcryptRes) {
        if (err) throw err;
        if (bcryptRes) {

          // 使用token
          const rule = {
            id: user.id,
            email: user.email,
            identity: user.identity,
            avatar: user.avatar,
            name: user.name
          };

          jwt.sign(rule, secretOrKey, { expiresIn: 7200 }, (err, token) => {

            if (err) throw err;
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          })
        } else {
          return res.status(400).json('密码错误')
        }
      });
    })
})

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  const nowReq = req.user;
  res.json({
    id: nowReq.id,
    name: nowReq.name,
    email: nowReq.email,
    identity: nowReq.identity
  })

})


module.exports = router