const wechat = require('../controllers/wechat')

const parseXml = require('../midlewares/parseXml')
const wxAccessToken = require('../midlewares/wxAccessToken')

module.exports = app => {
  app.get('/wx', wxAccessToken, wechat.wx_auth)
  app.post('/wx', parseXml, wechat.wxEventParser)
}