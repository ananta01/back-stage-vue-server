const express = require('express')
const passport = require('passport')

const router = express.Router()

const UserMes = require('../../models/UserMes')

// 创建添加信息接口  api/usermes/add
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  const monthFiles = {};
  const nowReq = req.body;

  if (nowReq.name) monthFiles.name = nowReq.name;
  if (nowReq.email) monthFiles.email = nowReq.email;
  if (nowReq.avatar) monthFiles.avatar = nowReq.avatar;
  if (nowReq.message) monthFiles.message = nowReq.message;

  // 存进数据库
  new UserMes(monthFiles)
    .save()
    .then(usermes => {
      res.json(usermes)
    })
})

// 创建已读信息接口  api/usermes/lookmes/:id
router.get('/lookmes', passport.authenticate('jwt', {session: false}), (req, res) => {
  // 更新信息
  UserMes.findOneAndUpdate(
    {_id: req.query.id},
    {$set: {isLook: 1}},
    {new: true}
  ).then(usermes => {
    if (!usermes) {
      return res.status(404).json('没有任何内容')
    } else {
      return res.json(usermes)
    }
  })

})

// 获取全部信息
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  UserMes.find()
    .then(usermes => {
      if (!usermes) {
        return res.status(404).json('没有任何内容')
      }
      return res.json(usermes)
    })
    .catch(err => res.status(404).json(err))
})

// 删除信息
router.delete('/delete/:id',  passport.authenticate('jwt', {session: false}), (req, res) => {

  UserMes.findOneAndDelete({_id: req.params.id})
    .then(usermes => {
      res.json(usermes)
    })
    .catch(err => res.status(404).json('删除失败'))
})



module.exports = router