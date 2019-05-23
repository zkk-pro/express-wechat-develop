
const crypto = require('crypto')
const xml2js = require('xml2js')
const wxConfig = require('../config/wx.config')

// 微信服务器验证
exports.wx_auth = (req, res) => {
  let signature = req.query.signature
  let timestamp = req.query.timestamp
  let nonce = req.query.nonce
  let echostr = req.query.echostr

  // 对参数字典排序
  let tempArr = [wxConfig.token, timestamp, nonce]
  tempArr.sort()

  // 拼接字符串、sha1加密
  let tempStr = tempArr.join('')
  let hash = crypto.createHash('sha1')
  let result = hash.update(tempStr).digest('hex')

  // 判断是否来自微信服务器的请求
  if(result === signature) {
    res.send(echostr)
  } else {
    res.send('<h2>不是来自微信服务器的请求</h2>')
  }
}

// 微信各种事件处理
exports.wxEventParser = (req, res) => {
  switch(req.body.MsgType.toLowerCase()) {
    case 'text':
      let back_msg = {
        ToUserName: req.body.FromUserName,
        FromUserName: req.body.ToUserName,
        CreateTime: new Date().getTime(),
        MsgType: 'text',
        Content: req.body.Content + '(╯3╰)'
      }
      let builder = new xml2js.Builder({rootName: 'xml', cdata: true})
      let xml = builder.buildObject(back_msg)
      res.send(xml)
  }
}