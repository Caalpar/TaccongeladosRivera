const User = require('../Models/user.js')

function Getclient(_id) {
    const user = User.findOne({ _id: _id }).exec()
    return user
}

module.exports = {
    Getclient
}