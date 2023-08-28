const monggose = require('mongoose')
const { urlconnect, urlconnectLocal } = require('./config')

//monggose.connect(urlconnect, { useNewUrlParser: true, useUnifiedTopology: true }, (err, data) => {
monggose.connect(urlconnect, { useNewUrlParser: true, useUnifiedTopology: true }, (err, data) => {
    if (err) {
        console.log("error connecting to DB")
    }
    if (data) {
        console.log("connected to DB");
    }
})