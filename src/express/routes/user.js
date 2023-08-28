const express = require('express')
const { CreateUser, EditUser, AddPizzeriaID, ValidateUser, ValidateToken, GetAllClientes, Get_AllClientes, GetClient, GetStaff } = require('../../mongodb/Controllers/user.js')


const router = express.Router();

router.post('/create', (req, res) => {
    let { user_name, password, client, phone, address, neighborhood, reference, corner, last_name, first_name, email } = req.body
    console.log('por crear el usuario')
    CreateUser(user_name, password, client, phone, address, neighborhood, reference, corner, last_name, first_name, email, res)
})


router.post('/edit', (req, res) => {
    let { _id, user_name, client, phone, address, neighborhood, reference, corner, last_name, first_name, email } = req.body

    EditUser(_id, user_name, client, phone, address, neighborhood, reference, corner, last_name, first_name, email, res)
})

router.put('/addpizzeria', (req, res) => {
    let { user_name, pizzeria_id } = req.body
    AddPizzeriaID(user_name, pizzeria_id, res)
})

router.post('/login', (req, res) => {
    let { user_name, password } = req.body
    ValidateUser(user_name, password, res)
})

router.get('/approved:user', (req, res) => {
    let user = req.params.user.split('&')
    ValidateToken(user[0], user[1], res)
})

router.get('/all', (req, res) => {
    GetAllClientes(res)
})

router.get('/:id', (req, res) => {
    let id = req.params.id
    GetClient(id, res)
})

router.get('/staff', (req, res) => {
    GetStaff(res)
})


module.exports = router;