const express = require('express')
const passport = require('passport')

const router = express.Router()

const SysNotice = require('../../models/SysNotice')

// 创建添加信息接口  api/sysnotice/add
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {

  const sysNotice = {};
  const nowReq = req.body;

  if (nowReq.name) sysNotice.name = nowReq.name;
  if (nowReq.type) sysNotice.type = nowReq.type;
  if (nowReq.message) sysNotice.message = nowReq.message;

  // 存进数据库
  new SysNotice(sysNotice)
    .save()
    .then(usermes => {
      res.json(usermes)
    })
})


// 获取全部信息
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  SysNotice.find().sort({"created":-1})
    .then(usermes => {
      if (!usermes) {
        return res.status(404).json('没有任何内容')
      }
      return res.json(usermes)
    })
    .catch(err => res.status(404).json(err))
})

// 删除信息
router.delete('/delete',  passport.authenticate('jwt', {session: false}), (req, res) => {

  SysNotice.findOneAndDelete({_id: req.query.id})
    .then(usermes => {
      res.json(usermes)
    })
    .catch(err => res.status(404).json('删除失败'))
})


module.exports = router