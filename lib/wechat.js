const Crypto = require('crypto')
const token = 'zkk'
module.exports = class {
  constructor(req, res) {
    this.signature = req.query.signature
    this.timestamp = req.query.timestamp
    this.nonce = req.query.nonce
    this.echostr = req.query.echostr
  }
  auth () {
    let tempArr = [token, this.timestamp, this.nonce]
    tempArr.sort() // 字典排序
    let tempStr = tempArr.join('')
    const hash = Crypto.createHash('sha1')
    let result = hash.update(tempStr, 'utf8').digest('hex')
    console.log('result:', result)
    console.log('this.signature:', this.signature)
    if (result === this.signature) {
      return this.echostr
    } else {
      return '<h2>不是微信打开的</h2>'
    }
  }
}