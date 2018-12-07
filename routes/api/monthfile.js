const express = require('express')
const passport = require('passport')

const secretOrKey = require('../../config/keys').secretOrKey
const router = express.Router()

const MonthFile = require('../../models/MonthFile')


// 创建添加信息接口  api/monthfiles/add
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  const monthFiles = {};
  const nowReq = req.body;

  if (nowReq.area) monthFiles.area = nowReq.area;
  if (nowReq.janEle) monthFiles.janEle = nowReq.janEle;
  if (nowReq.febEle) monthFiles.febEle = nowReq.febEle;
  if (nowReq.marEle) monthFiles.marEle = nowReq.marEle;
  if (nowReq.aprEle) monthFiles.aprEle = nowReq.aprEle;
  if (nowReq.mayEle) monthFiles.mayEle = nowReq.mayEle;
  if (nowReq.junEle) monthFiles.junEle = nowReq.junEle;
  if (nowReq.julEle) monthFiles.julEle = nowReq.julEle;
  if (nowReq.augEle) monthFiles.augEle = nowReq.augEle;
  if (nowReq.sepEle) monthFiles.sepEle = nowReq.sepEle;
  if (nowReq.octEle) monthFiles.octEle = nowReq.octEle;
  if (nowReq.novEle) monthFiles.novEle = nowReq.novEle;
  if (nowReq.decEle) monthFiles.decEle = nowReq.decEle;
  if (nowReq.janMoney) monthFiles.janMoney = nowReq.janMoney;
  if (nowReq.febMoney) monthFiles.febMoney = nowReq.febMoney;
  if (nowReq.marMoney) monthFiles.marMoney = nowReq.marMoney;
  if (nowReq.aprMoney) monthFiles.aprMoney = nowReq.aprMoney;
  if (nowReq.mayMoney) monthFiles.mayMoney = nowReq.mayMoney;
  if (nowReq.junMoney) monthFiles.junMoney = nowReq.junMoney;
  if (nowReq.julMoney) monthFiles.julMoney = nowReq.julMoney;
  if (nowReq.augMoney) monthFiles.augMoney = nowReq.augMoney;
  if (nowReq.sepMoney) monthFiles.sepMoney = nowReq.sepMoney;
  if (nowReq.octMoney) monthFiles.octMoney = nowReq.octMoney;
  if (nowReq.novMoney) monthFiles.novMoney = nowReq.novMoney;
  if (nowReq.decMoney) monthFiles.decMoney = nowReq.decMoney;
  // 存进数据库
  new MonthFile(monthFiles)
    .save()
    .then(monthFile => {
      res.json(monthFile)
    })

})

// 创建修改信息接口  api/monthfiles/update/:id
router.post('/update/:area', passport.authenticate('jwt', {session: false}), (req, res) => {
  const monthFiles = {};
  const nowReq = req.body;

  if (nowReq.area) monthFiles.area = nowReq.area;
  if (nowReq.dataEleList.jan) monthFiles.janEle = nowReq.dataEleList.jan;
  if (nowReq.dataEleList.feb) monthFiles.febEle = nowReq.dataEleList.feb;
  if (nowReq.dataEleList.mar) monthFiles.marEle = nowReq.dataEleList.mar;
  if (nowReq.dataEleList.apr) monthFiles.aprEle = nowReq.dataEleList.apr;
  if (nowReq.dataEleList.may) monthFiles.mayEle = nowReq.dataEleList.may;
  if (nowReq.dataEleList.jun) monthFiles.junEle = nowReq.dataEleList.jun;
  if (nowReq.dataEleList.jul) monthFiles.julEle = nowReq.dataEleList.jul;
  if (nowReq.dataEleList.aug) monthFiles.augEle = nowReq.dataEleList.aug;
  if (nowReq.dataEleList.sep) monthFiles.sepEle = nowReq.dataEleList.sep;
  if (nowReq.dataEleList.oct) monthFiles.octEle = nowReq.dataEleList.oct;
  if (nowReq.dataEleList.nov) monthFiles.novEle = nowReq.dataEleList.nov;
  if (nowReq.dataEleList.dec) monthFiles.decEle = nowReq.dataEleList.dec;
  if (nowReq.dataMoneyList.jan) monthFiles.janMoney = nowReq.dataMoneyList.jan;
  if (nowReq.dataMoneyList.feb) monthFiles.febMoney = nowReq.dataMoneyList.feb;
  if (nowReq.dataMoneyList.mar) monthFiles.marMoney = nowReq.dataMoneyList.mar;
  if (nowReq.dataMoneyList.apr) monthFiles.aprMoney = nowReq.dataMoneyList.apr;
  if (nowReq.dataMoneyList.may) monthFiles.mayMoney = nowReq.dataMoneyList.may;
  if (nowReq.dataMoneyList.jun) monthFiles.junMoney = nowReq.dataMoneyList.jun;
  if (nowReq.dataMoneyList.jul) monthFiles.julMoney = nowReq.dataMoneyList.jul;
  if (nowReq.dataMoneyList.aug) monthFiles.augMoney = nowReq.dataMoneyList.aug;
  if (nowReq.dataMoneyList.sep) monthFiles.sepMoney = nowReq.dataMoneyList.sep;
  if (nowReq.dataMoneyList.oct) monthFiles.octMoney = nowReq.dataMoneyList.oct;
  if (nowReq.dataMoneyList.nov) monthFiles.novMoney = nowReq.dataMoneyList.nov;
  if (nowReq.dataMoneyList.dec) monthFiles.decMoney = nowReq.dataMoneyList.dec;

  // 更新信息
  MonthFile.findOneAndUpdate(
    {area: req.params.area},
    {$set: monthFiles},
    {new: true}
  ).then(monthFile => {
    if (!monthFile) {
      return res.status(404).json('没有任何内容')
    } else {
      return res.json(monthFile)
    }
  })

})

// 获取全部信息
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  MonthFile.find({area: req.query.area})
    .then(monthFile => {
      if (!monthFile) {
        return res.status(404).json('没有任何内容')
      }
      return res.json(monthFile)
    })
    .catch(err => res.status(404).json(err))
})



module.exports = router