const Express = require('express')

const app = new Express()

app.set('port', process.env.PORT || 80)

require('./routes')(app)
 
app.listen(app.get('port'), () => {
  console.log(`app running port at http://localhost:${app.get('port')}`)
})

