const express = require('express')
const passport = require('passport')

const secretOrKey = require('../../config/keys').secretOrKey
const router = express.Router()

const ProFile = require('../../models/ProFile')


// 创建添加信息接口  api/profiles/add
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  const profileFields = {};
  const nowReq = req.body;

  if (nowReq.type) profileFields.type = nowReq.type;
  if (nowReq.desc) profileFields.desc = nowReq.desc;
  if (nowReq.area) profileFields.area = nowReq.area;
  if (nowReq.expend) profileFields.expend = nowReq.expend;
  if (nowReq.cash) profileFields.cash = nowReq.cash;
  if (nowReq.remark) profileFields.remark = nowReq.remark;

  // 存进数据库
  new ProFile(profileFields)
    .save()
    .then(profile => {
      res.json(profile)
    })

})

// 获取全部信息
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  ProFile.find()
    .then(profile => {
      if (!profile) {
        return res.status(404).json('没有任何内容')
      }
      return res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})


// 获取单条信息
router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  ProFile.findOne({_id: req.params.id})
    .then(profile => {
      if (!profile) {
        return res.status(404).json('没有任何内容')
      }
      return res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

// 分页信息
router.post('/pagelist', passport.authenticate('jwt', {session: false}), (req, res) => {
  let total = 0;
  let page = parseFloat(req.body.page);
  let page_sizes = parseFloat(req.body.page_sizes);

  page = page < 1 ? 1 : page;

  ProFile.find().skip((page - 1) * page_sizes).limit(page_sizes)
    .then(profile => {
      if (!profile) {
        return res.status(404).json('没有任何内容')
      } else {
        ProFile.find().estimatedDocumentCount().then(count => {
          total = count;
          res.json({profile, total})
        })
      }
    })
    .catch(err => res.status(404).json(err))
})

// 筛选信息
router.post('/filterdata', passport.authenticate('jwt', {session: false}), (req, res) => {
  let startTime = req.body.startTime;
  let endTime = req.body.endTime;
  let total = 0;
  let page = parseFloat(req.body.page);
  let page_sizes = parseFloat(req.body.page_sizes);

  page = page < 1 ? 1 : page;

  ProFile.find({ "created" : { "$gte" : startTime, "$lte" : endTime }}).skip((page - 1) * page_sizes).limit(page_sizes)
    .then(profile => {
      if (!profile) {
        return res.status(404).json('没有任何内容')
      } else {
        ProFile.find({ "created" : { "$gte" : startTime, "$lte" : endTime }}).count().then(count => {
          total = count;
          res.json({profile, total})
        })
      }
    })
    .catch(err => res.status(404).json(err))
})

// 修改信息接口  api/profiles/update/:id
router.post('/update/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const profileFields = {};
  const nowReq = req.body;

  if (nowReq.type) profileFields.type = nowReq.type;
  if (nowReq.desc) profileFields.desc = nowReq.desc;
  if (nowReq.income) profileFields.income = nowReq.income;
  if (nowReq.expend) profileFields.expend = nowReq.expend;
  if (nowReq.cash) profileFields.cash = nowReq.cash;
  if (nowReq.remark) profileFields.remark = nowReq.remark;

  // 更新信息
  ProFile.findOneAndUpdate(
    {_id: req.params.id},
    {$set: profileFields},
    {new: true}
  ).then(profile => res.json(profile))

})

// 删除信息接口  api/profiles/delete/:id
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  ProFile.findOneAndDelete({_id: req.params.id})
    .then(profile => {
      res.json(profile)
    })
    .catch(err => res.status(404).json('删除失败'))

})


module.exports = router