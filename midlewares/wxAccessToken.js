
// 获取 access_token 中间件

const rp = require('request-promise')
const util = require('util')
const fs = require('fs')
const wxConfig = require('../config/wx.config')
const wxToken = require('./access_token')

module.exports = async (req, res, next) => {
  // 判断是否有 access_token 或 是否过期
  if (!wxToken.wxAccessToken || wxToken.expires_time < new Date().getTime()) {
    console.log('access_token 已过期')
    let accessTokenApi = util.format(
      wxConfig.apiUrl.accessToken, 
      wxConfig.domain, 
      wxConfig.appID,
      wxConfig.appsecret
      )
    let data = await rp(accessTokenApi)
    data = JSON.parse(data)
    
    let token = {}
    token.wxAccessToken = data.access_token
    // 过期时间，当前时间戳 + 7200秒 - 300秒（提前5分钟获取）在转为毫秒（ * 1000 ）
    token.expires_time = new Date().getTime() + (data.expires_in - 300 * 1000)
    
    // 写入文件里
    fs.writeFile(__dirname + '/access_token.json', JSON.stringify(token), err => {
      if (err) console.log('token写入失败 ----> ', err)
    })
    next()
  } else {
    console.log('access_token 未过期')
    next()
  }
}