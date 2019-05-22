const Express = require('express')
const bodyParse = require('body-parser')
const { parseString } = require('xml2js')
const Wechat = require('./lib/wechat')

const app = new Express()

app.set('port', process.env.PORT || 80)

app.use(bodyParse.urlencoded({ extended: false }))
app.use(bodyParse.json())

app.get('/', (req, res) => {
  
  console.log(req.query)
  const wechat = new Wechat(req, res)
  res.send(wechat.auth())
  // res.send('<h1>Hey, guys!</h1>')
})
app.post('/', parseString({ explicitArray: false }), (req, res) => {
  let result = ''
  req.on('data', data => {
    result += data
  })
  req.on('end', () => {
    console.log(result)
  })
  // console.log('body: ', req)
  // const wechat = new Wechat(req, res)
  // res.send(wechat.auth())
  // res.send('<h1>Hey, guys!</h1>')
})

app.listen(app.get('port'), () => {
  console.log(`app running port at http://localhost:${app.get('port')}`)
})