const fs = require('fs')
const path = require('path')

const SendClient = (res, object, con = true) => {
    if (con)
        console.log(object.msg)
    if (res !== null && typeof res != 'undefined')
        res.json(object)
}

const DeleteImg = (url, name_img) => {
    let img_path = path.join(__dirname, url)
    img_path += name_img
    try {
        fs.unlinkSync(img_path)
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    SendClient,
    DeleteImg,
    ingersos: 'INGRESOS',
    egresos: 'EGRESOS'
}