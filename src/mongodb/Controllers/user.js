const User = require('../Models/user.js')
const { SendClient } = require('../../tools/tools.js')
const { nanoid } = require('nanoid')
    //const { GetMenusAtUser } = require('./pizzeria.js')
const pizzeriaControler = require('./pizzeria.js')
    //const { GetPedidoFromID } = require('./pedido.js')
const pedidoControler = require('./extra_pedidos.js')
const { ObjectID } = require('mongodb')

function CreateUser(user_name, password, client, phone, address, neighborhood, reference, corner, last_name, first_name, email, res) {

    User.findOne({ $or: [{ user_name: user_name }, { phone: phone }, { email: email }] }, (err, user) => {

        if (err) throw err

        if (!user) {

            const new_user = new User()
            new_user.user_name = user_name
            new_user.email = email
            new_user.first_name = first_name
            new_user.last_name = last_name
            new_user.address = address
            new_user.phone = phone
            new_user.neighborhood = neighborhood
            new_user.reference = reference
            new_user.corner = corner
            new_user.password = new_user.generateHash(password)
            new_user.client = client

            new_user.save((err, data) => {
                if (err) throw err

                if (data) {
                    SendClient(res, { msg: "el cliente fue creado correctamente, ahora puede iniciar sesion...", error: false })
                }
            })

        } else {

            if (user.phone == phone)
                SendClient(res, { msg: "ya existe un cliente con este telefóno", error: true })
            else if (user.email == email)
                SendClient(res, { msg: "ya existe un cliente con este email", error: true })
            else
                SendClient(res, { msg: "el cliente ya existe", error: true })
        }

    })
}

function EditUser(_id, user_name, client, phone, address, neighborhood, reference, corner, last_name, first_name, email, res) {

    User.findOne({ _id }, (err, user) => {

        if (err) throw err

        if (user) {


            user.user_name = user_name
            user.email = email
            user.first_name = first_name
            user.last_name = last_name
            user.address = address
            user.phone = phone
            user.neighborhood = neighborhood
            user.reference = reference
            user.corner = corner
            user.client = client

            user.save((err, data) => {
                if (err) throw err

                if (data) {
                    SendClient(res, { msg: "el cliente fue actualizado correctamente", error: false })
                }
            })

        } else {

            SendClient(res, { msg: "error al actualizar el cliente", error: true })

        }

    })
}

function AddPizzeriaID(user_name, pizzeria_id, res) {
    User.findOne({ first_name: user_name }, (err, user) => {
        if (err) throw err

        if (user) {
            if (!user.isClient) {
                user.pizzeria_id = pizzeria_id;
                SendClient(res, { msg: "se ha agregado el id de la pizzeria correctamente" })

            } else {
                SendClient(res, { msg: "el usuario es cliente no dueño" })

            }
        } else {
            SendClient(res, { msg: "el usuario no existe" })
        }
    })
}

function ValidateToken(user_name, token, res) {
    User.findOne({ first_name: user_name, token: token }, (err, user) => {
        if (err) throw err

        if (user)
            SendClient(res, { msg: "ususario correcto" })
        else
            SendClient(res, { msg: "ususario o constraseña incorrecta" })


    })
}

function ValidateUser(user_name, password, res) {
    User.findOne({ user_name: user_name }, (err, user) => {
        if (err) throw err

        if (user) {

            if (user.validatePassword(password)) {

                let token = nanoid()
                let client = user.client
                let first_name = user.first_name
                let last_name = user.last_name
                let id = user._id
                let orders = user.my_oreders

                user.token = token


                user.save((err, data) => {
                    if (err) throw err

                    if (data) {
                        let send_data = {
                            first_name,
                            last_name,
                            msg: "Bienvenido",
                            link: "approved",
                            token,
                            client,
                            id,
                            orders
                        }

                        pizzeriaControler.GetMenusAtUser(send_data, orders, res)
                            // SendClient(res, send_data)


                    }
                })



            } else {
                SendClient(res, { msg: "ususario o constraseña incorrecta" })
            }

        } else {
            SendClient(res, { msg: "ususario o constraseña incorrecta" })
        }

    })
}

function GetallClientes() {
    const clients = User.find({ client: true }, { __v: 0, password: 0, token: 0, client: 0, pizzeria_id: 0, my_oreders: 0 }).exec()
    return clients
}

function GetAllClientes(res) {
    User.find({ client: true }, { __v: 0, password: 0, token: 0, client: 0, pizzeria_id: 0, my_oreders: 0 }, (err, users) => {
        if (err) throw err
        if (users)
            SendClient(res, { msg: "se encontraron los usuarios", users })
        else
            SendClient(res, { msg: "no hay usuarios registrados" })
    })
}

function AddOrederClientes(_id, _id_oreder, _id_pizzeria, date, menus_id, res) {
    const user = User.findOne({ _id: _id }, (err, user) => {
        if (err) throw err
        if (user) {
            let oreder_active = { _id_oreder, oreder_active: "process", _id_pizzeria, menus_id, date }
            user.my_oreders.push(oreder_active)


            user.save((err, data) => {
                if (err) throw err

                if (data) {
                    pedidoControler.GetPedidoFromID(_id_oreder, res)

                    //GetMenusAtUser    
                    // SendClient(res, { msg: "el pedido se ha cargado correctamente", oreder_active,_id:data._id })  
                } else
                    SendClient(res, { msg: "no se pudo cargar el pedido" })
            })
        } else
            SendClient(res, { msg: "no se pudo cargar el pedido" })
    })
}

function UpdateOrederCliente(_id, _id_oreder, state, res, msg) {

    console.log(_id_oreder)

    User.updateOne({
        '_id': ObjectID(_id),
        'my_oreders._id_oreder': ObjectID(_id_oreder)
    }, {
        $set: {
            'my_oreders.$.oreder_active': state
        }
    }, (err, data) => {
        if (data)
            SendClient(res, { msg })

    })
}

function GetClientes() {
    const useres = User.find({}, { __v: 0, password: 0, token: 0, client: 0, pizzeria_id: 0, my_oreders: 0 }).exec()
    return useres
}

function GetClient(_id, res) {
    User.find({ _id: _id }, { _id: 0, __v: 0 }, (err, user) => {
        if (err) throw err
        if (user)
            SendClient(res, { msg: "se encontro el usario", user })
        else
            SendClient(res, { msg: "no existe el usuario" })
    })

}


function Getclient(_id) {
    const user = User.findOne({ _id: _id }).exec()
    return user
}


module.exports = {
    CreateUser,
    EditUser,
    AddPizzeriaID,
    ValidateToken,
    ValidateUser,
    GetallClientes,
    GetAllClientes,
    AddOrederClientes,
    UpdateOrederCliente,
    GetClientes,
    GetClient,
    Getclient
}