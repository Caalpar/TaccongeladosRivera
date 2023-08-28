const express = require('express')
const routes = require('./routes/index')
const app = express()

app.use(express.json(), express.text())
app.use(
    express.urlencoded({
        extended: true
    })
)


app.use(express.static('public'))

app.use('/', routes)

app.set('port', process.env.PORT || 46663)

app.listen(app.get('port'), '0.0.0.0', () =>
    console.log(`Express successfully connected to port ${app.get('port')}`)
)