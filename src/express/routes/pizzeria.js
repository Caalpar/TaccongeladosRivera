const express = require('express')
const upload = require('../../multer/index')
const sharp = require('sharp')
const path = require('path')
    //const { GetPizzeria, GetSatatePizzerias, SendHoursAndDaysSettings, CreatePizzeria, AddCategoria, EditCategoria, DeleteCategoria, AddMenu, EditMenu, DeleteMenu, GetPizzerias, SetPortada } = require('../../mongodb/Controllers/pizzeria')
const pizzeriaControler = require('../../mongodb/Controllers/pizzeria')
const { DeleteImg } = require('../../tools/tools.js')

const router = express.Router();

router.get('/', (req, res) => {
    let { _id_pizzeria } = req.body
    pizzeriaControler.GetPizzeria(_id_pizzeria, res)
})

router.get('/pizzrias', (req, res) => {
    pizzeriaControler.GetPizzerias(res)
})

router.post('/sethoursanddays', (req, res) => {
    let { id_pizzeria, hours_days } = req.body
    pizzeriaControler.SendHoursAndDaysSettings(id_pizzeria, hours_days, res)
})

router.post('/updatepizzeriastate', (req, res) => {
    let { open } = req.body
    pizzeriaControler.GetSatatePizzerias(open, res)
})

router.post('/create', (req, res) => {
    let { email, name, address, phone, user_id } = req.body
    pizzeriaControler.CreatePizzeria(email, name, address, phone, user_id, res)
})

router.post('/addcategoria', (req, res) => {
    console.log(req.body)
    let { _id_pizzeria, categoria } = req.body
    pizzeriaControler.AddCategoria(_id_pizzeria, categoria, res)
})

router.post('/editcategoria', (req, res) => {
    let { _id_pizzeria, _id_cat, categoria } = req.body

    console.log(_id_pizzeria, _id_cat, categoria)
    pizzeriaControler.EditCategoria(_id_pizzeria, _id_cat, categoria, res)
})

router.delete('/deletecategoria', (req, res) => {
    let { _id_pizzeria, categoria } = req.body
    pizzeriaControler.DeleteCategoria(_id_pizzeria, categoria, res)
})


router.post('/addmenu', upload.array('imge', 5), async(req, res) => {


    for (let index = 0; index < req.files.length; index++) {
        const file = req.files[index];
        await optimizePhoto(file)
    }


    let { _id_pizzeria, categoria, menu } = JSON.parse(req.body.user_data)
    pizzeriaControler.AddMenu(_id_pizzeria, categoria, menu, res)
})

router.post('/editmenu', upload.array('imge', 5), async(req, res) => {

    console.log(req.files)
    console.log('cambiar foto')
    for (let index = 0; index < req.files.length; index++) {
        const file = req.files[index];
        await optimizePhoto(file)
    }

    let { _id_pizzeria, categoria, menu } = JSON.parse(req.body.data_send)
    pizzeriaControler.EditMenu(_id_pizzeria, categoria, menu, res)
})

router.post('/setportada', (req, res) => {

    console.log(req.body)
    let { _id_pizzeria, categoria, menu } = req.body
    pizzeriaControler.SetPortada(_id_pizzeria, categoria, menu, res)

})

router.delete('/deletemenu', (req, res) => {
    let { _id, _id_pizzeria, categoria } = req.body
    pizzeriaControler.DeleteMenu(_id, _id_pizzeria, categoria, res)
})

const optimizePhoto = async(file) => {
    let img_path = path.join(__dirname, "../../assets/imgs/")
    let img_path_source = path.join(__dirname, "../../assets/imgsOriginales/")
    let quality = 100

    if (file.size <= 100000) quality = 100
    else if (file.size <= 200000) quality = 90
    else if (file.size <= 300000) quality = 80
    else if (file.size <= 400000) quality = 70
    else if (file.size <= 500000) quality = 60
    else if (file.size <= 600000) quality = 50
    else if (file.size <= 700000) quality = 40
    else if (file.size <= 800000) quality = 30
    else if (file.size <= 900000) quality = 20
    else quality = 20

    console.log('por optimizar la foto')

    await sharp(path.join(img_path_source, file.originalname)).jpeg({
        quality
    }).toFile(img_path + file.originalname)

    setTimeout(() => {
        DeleteImg('../assets/imgsOriginales/', file.originalname)
    }, 20000);
}


module.exports = router;