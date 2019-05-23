
// 解析xml数据格式转为json格式中间件

const { parseString } = require('xml2js')

module.exports = (req, res, next) => {
  let result = ''
  req.on('data', (chunk) => {
    result += chunk
  })
  req.on('end', () => {
    parseString(result, {explicitArray: false}, (err, json) => {
      if (err) return next(err)
      req.body = json.xml
      next()
    })
  })
}