const Pedidos = require('../Models/pedido.js')
    //const { Getpizzeria, Getpizzerias } = require('./pizzeria.js')
const pizzeriaControler = require('./pizzeria.js')
    //const { Getclient, GetClientes, GetallClientes, AddOrederClientes, UpdateOrederCliente } = require('./user.js')
const userControles = require('./user.js')
const userControlesExtra = require('./extra_user.js')
    //const { GetDelivery, Getdelivery, Getdeliverys } = require('./delivery.js')
const deliveryControlers = require('./delivery.js')
const { SendClient } = require('../../tools/tools.js')


function CreatePedido(id_cliente, id_Pizzeria, ids_menu, details, payment_method, res) {

    Pedidos.find({}, (err, pedidos) => {

        if (err) throw err

        if (!pedidos) {
            pizzeriaControler.Getpizzeria(id_Pizzeria).then(pizz => {
                if (pizz) {
                    console.log('por hacer el pedido 1')
                    userControlesExtra.Getclient(id_cliente).then(client => {
                        if (client) {

                            if (pizz.OpenStored().open) {

                                let index_m = -1
                                let index_cat = -1
                                pizz.menus.forEach((c, index_c) => {
                                    if (index_m === -1) {
                                        index_cat = index_c
                                        ids_menu.forEach(id_menu_order => {
                                            index_m = c.menu.findIndex(c => c._id.toString() == id_menu_order._id_menu.toString())
                                        });


                                    }
                                });

                                if (index_cat !== -1 && index_m !== -1) {
                                    const new_pedido = new Pedidos()
                                    new_pedido.id_user = id_cliente
                                    new_pedido.id_pizzeria = id_Pizzeria
                                    new_pedido.ids_menu = ids_menu
                                    new_pedido.id_delivery = ''
                                    new_pedido.payment_method = payment_method
                                    new_pedido.details = details
                                    let current_date = new Date()
                                    new_pedido.date = current_date.toLocaleString("en-US", { timeZone: "America/Montevideo" })
                                    new_pedido.state = 'received'
                                    new_pedido.cancel = false
                                    new_pedido.order_number = 0


                                    new_pedido.save((err, data) => {
                                        if (err) throw err

                                        if (data) {
                                            let date_local = data.date.toLocaleString()
                                            console.log(data.order_number)
                                            userControles.AddOrederClientes(id_cliente, data._id, data.id_pizzeria, date_local, ids_menu, res)

                                        }


                                    })
                                } else
                                    SendClient(res, { msg: "error al crear el pedido" })
                            } else
                                SendClient(res, { msg: "el local esta cerrado" })
                        } else
                            SendClient(res, { msg: "el cliente no existe" })

                    }).catch((err) => { console.log(err) })


                } else
                    SendClient(res, { msg: "la pizzeria no existe" })
            }).catch((err) => { console.log(err) })

        } else {
            pizzeriaControler.Getpizzeria(id_Pizzeria).then(pizz => {
                if (pizz) {

                    console.log('por hacer el pedido')
                    userControlesExtra.Getclient(id_cliente).then(client => {
                        if (client) {

                            if (pizz.OpenStored().open) {

                                let index_m = -1
                                let index_cat = -1
                                pizz.menus.forEach((c, index_c) => {
                                    if (index_m === -1) {
                                        index_cat = index_c
                                        ids_menu.forEach(id_menu_order => {
                                            index_m = c.menu.findIndex(c => c._id.toString() == id_menu_order._id_menu.toString())
                                        });


                                    }
                                });

                                if (index_cat !== -1 && index_m !== -1) {
                                    const new_pedido = new Pedidos()
                                    new_pedido.id_user = id_cliente
                                    new_pedido.id_pizzeria = id_Pizzeria
                                    new_pedido.ids_menu = ids_menu
                                    new_pedido.payment_method = payment_method
                                    new_pedido.id_delivery = ''
                                    new_pedido.details = details
                                    let current_date = new Date()
                                    new_pedido.date = current_date.toLocaleString("en-US", { timeZone: "America/Montevideo" })
                                    new_pedido.state = 'received'

                                    console.log(pedidos)
                                    if (pedidos.length > 0) {
                                        let last_oreder = pedidos[pedidos.length - 1].order_number

                                        console.log(pedidos[pedidos.length - 1])
                                        if (last_oreder == 100)
                                            last_oreder = 0
                                        else
                                            last_oreder++

                                            new_pedido.order_number = last_oreder
                                    } else {
                                        new_pedido.order_number = 0
                                    }




                                    new_pedido.save((err, data) => {
                                        if (err) throw err

                                        if (data) {
                                            let date_local = data.date.toLocaleString()
                                            console.log(data.order_number)
                                            userControles.AddOrederClientes(id_cliente, data._id, data.id_pizzeria, date_local, ids_menu, res)

                                        }


                                    })
                                } else
                                    SendClient(res, { msg: "error al crear el pedido" })
                            } else
                                SendClient(res, { msg: "el local esta cerrado" })
                        } else
                            SendClient(res, { msg: "el cliente no existe" })

                    }).catch((err) => { console.log(err) })
                } else
                    SendClient(res, { msg: "la pizzeria no existe" })
            }).catch((err) => { console.log(err) })
        }


    })

}

function GetOrederState(_id, res) {
    Pedidos.findOne({ _id: _id }, (err, pedido) => {
        if (err) throw err

        if (pedido) {
            pizzeriaControler.Getpizzeria(pedido.id_pizzeria).then(pizz => {

                let state = pedido.state

                if (pizz) {
                    let open = pizz.OpenStored().open

                    deliveryControlers.Getdeliverys().then(del => {



                        if (del) {
                            let index_delivery = del.findIndex(m => m._id == pedido.id_delivery)
                            let delivery = del[index_delivery]


                            SendClient(res, { msg: "este es el estado del pedido", delivery, pedido, open }, false)
                        } else {
                            SendClient(res, { msg: "este es el estado del pedido", state, open })
                        }
                    }).catch((err) => { console.log(err) })
                } else
                    SendClient(res, { msg: "no se encontro la pizzeria" })
            }).catch((err) => { console.log(err) })

        } else {
            SendClient(res, { msg: "no se ha encontrado el pedido" })
        }
    })
}

function AddDelivery(_id, _id_delivery, res) {


    Pedidos.findOne({ _id: _id }, (err, pedido) => {

        if (err) throw err

        if (pedido) {

            if (pedido.state == 'process') {
                pedido.id_delivery = _id_delivery
                pedido.state = 'in coming'

                pedido.save((err, data) => {
                    if (err) throw err

                    if (data) {
                        SendClient(res, { msg: "se agrrego correctamente el delivery al pedido" })
                    } else
                        SendClient(res, { msg: "se agrrego correctamente el delivery al pedido" })
                })
            } else {
                SendClient(res, { msg: "no se puede enviar un pedido cancelado o entregado" })
            }

        }
    })
}

function InProcessOrder(_id, res) {


    Pedidos.findOne({ _id: _id }, (err, pedido) => {

        if (err) throw err

        if (pedido) {

            if (pedido.state == 'received') {
                pedido.state = 'process'

                pedido.save((err, data) => {
                    if (err) throw err

                    if (data) {
                        userControles.UpdateOrederCliente(data.id_user, data._id, data.state, res, 'el pedido esta en proceso')
                    } else
                        SendClient(res, { msg: "no se a podido confirmar el pedido" })
                })
            } else {
                SendClient(res, { msg: "el pedido no se puede confirmar en este estado" })
            }
        } else {
            SendClient(res, { msg: "no se ha encontrado el pedido" })
        }

    })
}



function ConfirmOrder(_id, res) {


    Pedidos.findOne({ _id: _id }, (err, pedido) => {

        if (err) throw err

        if (pedido) {

            if (pedido.state == 'in coming') {
                pedido.state = 'delivered'

                pedido.save((err, data) => {
                    if (err) throw err

                    if (data) {

                        userControles.UpdateOrederCliente(data.id_user, data._id, data.state, res, 'el pedido esta confirmado')
                    } else
                        SendClient(res, { msg: "no se a podido confirmar el pedido" })
                })
            } else {
                SendClient(res, { msg: "el pedido no se puede confirmar en este estado" })
            }
        } else {
            SendClient(res, { msg: "no se ha encontrado el pedido" })
        }

    })
}


function GetPedidosFromDelivery(_id_delivery, res) {
    Pedidos.find({ id_delivery: _id_delivery }, (err, pedidos) => {
        if (err) throw err
        if (pedidos) {
            pizzeriaControler.GetPizzerias().then(pizz => {
                if (pizz) {
                    userControlesExtra.GetClientes().then(clients => {
                        if (clients) {

                            let orderformdelivery = []

                            pedidos.forEach(pedido => {

                                let index_pizz = pizz.findIndex(p => p._id === pedido.id_pizzeria)
                                let index_cli = clients.findIndex(c => c._id === pedido.id_user)

                                if ((index_pizz !== -1) && (index_cli !== -1)) {
                                    let index_menu = -1
                                    let menu = []


                                    pizz[index_pizz].menus.forEach(cat => {
                                        pedido.id_menu.forEach(_id_menu => {
                                            index_menu = cat.menu.findIndex(m => m._id.toString() === _id_menu.toString())
                                            if (index_menu !== -1) {
                                                menu.push(cat.menu[index_menu])
                                                index_menu = -1
                                            }
                                        })
                                    })

                                    if (menu.length > 0) {
                                        if (pedido._id_delivery !== null) {
                                            deliveryControlers.GetDelivery(pedido._id_delivery).then(delivery => {

                                                let order = {
                                                    pizz_name: pizz[index_pizz].name,
                                                    pizz_address: pizz[index_pizz].address,
                                                    pizz_phone: pizz[index_pizz].phone,
                                                    pizz_email: pizz[index_pizz].email,
                                                    menu: menu,
                                                    payment_method: pedido.payment_method,
                                                    details_menu: pedido.ids_menu,
                                                    client: clients[index_cli],
                                                    date: pedido.date,
                                                }
                                                if (delivery)
                                                    order.delivery = delivery
                                                else
                                                    order.delivery = null

                                                orderformdelivery.push(order)
                                            }).catch((err) => { console.log(err) })
                                        }
                                    }

                                }
                            });

                            if (orderformdelivery.length > 0)
                                SendClient(res, { msg: "se han enviado correctamente los pedidos", orderformdelivery })
                            else
                                SendClient(res, { msg: "no se encontraron los pedidos" })
                        }
                    }).catch((err) => { console.log(err) })
                }
            }).catch((err) => { console.log(err) })
        }
    })
}

function GetPedidos(_id_pizzeria, res) {
    Pedidos.find({ id_pizzeria: _id_pizzeria }, (err, pedidos) => {
        if (err) throw err
        if (pedidos) {
            pizzeriaControler.Getpizzerias().then(pizz => {
                if (pizz) {
                    userControles.GetallClientes().then(clients => {
                        if (clients) {


                            deliveryControlers.Getdeliverys().then(del => {
                                if (del) {
                                    let oreders = []


                                    pedidos.forEach(pedido => {
                                        // aca esta el problema  

                                        let index_pizz = pizz.findIndex(p => p._id == pedido.id_pizzeria)
                                        let index_cli = clients.findIndex(c => c._id == pedido.id_user)


                                        if ((index_pizz !== -1) && (index_cli !== -1)) {
                                            let index_menu = -1
                                            let menu = []
                                            let index_delivery = -1
                                            let delivery = ''


                                            pizz[index_pizz].menus.forEach(cat => {
                                                pedido.ids_menu.forEach(_id_menu => {
                                                    index_menu = cat.menu.findIndex(m => m._id.toString() == _id_menu._id_menu.toString())
                                                    if (index_menu !== -1) {
                                                        menu.push({ menu: cat.menu[index_menu], categoria: cat.categoria })
                                                        index_menu = -1
                                                    }
                                                })
                                            })

                                            index_delivery = del.findIndex(m => m._id == pedido.id_delivery)
                                            delivery = del[index_delivery]



                                            if (menu.length > 0) {

                                                let order = {
                                                    pizz_name: pizz[index_pizz].name,
                                                    pizz_address: pizz[index_pizz].address,
                                                    pizz_phone: pizz[index_pizz].phone,
                                                    pizz_email: pizz[index_pizz].email,
                                                    menu: menu,
                                                    details_menu: pedido.ids_menu,
                                                    payment_method: pedido.payment_method,
                                                    details: pedido.details,
                                                    client: clients[index_cli],
                                                    date: pedido.date.toLocaleString("en-US", { timeZone: "America/Montevideo" }),
                                                    delivery,
                                                    n_order: pedido.order_number,
                                                    _id: pedido._id,
                                                    state: pedido.state
                                                }

                                                oreders.push(order)

                                            }

                                        }

                                    });
                                    if (oreders.length > 0)
                                        SendClient(res, { msg: "se han enviado correctamente los pedidos", oreders }, false)

                                    else
                                        SendClient(res, { msg: "no se encontraron los pedidos" }, false)
                                } else {
                                    let oreders = []



                                    pedidos.forEach(pedido => {

                                        let index_pizz = pizz.findIndex(p => p._id == pedido.id_pizzeria)
                                        let index_cli = clients.findIndex(c => c._id == pedido.id_user)



                                        if ((index_pizz !== -1) && (index_cli !== -1)) {
                                            let index_menu = -1
                                            let menu = []



                                            pizz[index_pizz].menus.forEach(cat => {
                                                pedido.ids_menu.forEach(_id_menu => {
                                                    index_menu = cat.menu.findIndex(m => m._id.toString() == _id_menu._id_menu.toString())
                                                    if (index_menu !== -1) {
                                                        menu.push({ menu: cat.menu[index_menu], categoria: cat.categoria })
                                                        index_menu = -1
                                                    }
                                                })
                                            })


                                            if (menu.length > 0) {

                                                let order = {
                                                    pizz_name: pizz[index_pizz].name,
                                                    pizz_address: pizz[index_pizz].address,
                                                    pizz_phone: pizz[index_pizz].phone,
                                                    pizz_email: pizz[index_pizz].email,
                                                    menu: menu,
                                                    details_menu: pedido.ids_menu,
                                                    details: pedido.details,
                                                    client: clients[index_cli],
                                                    date: pedido.date.toLocaleString(),
                                                    delivery: '',
                                                    _id: pedido._id
                                                }

                                                oreders.push(order)

                                            }

                                        }

                                    });
                                    if (oreders.length > 0)
                                        SendClient(res, { msg: "se han enviado correctamente los pedidos", oreders })

                                    else
                                        SendClient(res, { msg: "no se encontraron los pedidos" }, false)

                                }
                            }).catch((err) => { console.log(err) })
                        }
                    }).catch((err) => { console.log(err) })
                }
            }).catch((err) => { console.log(err) })
        }
    }).sort('-date').limit(500)
}

function CancelPedido(_id, res) {
    Pedidos.findOne({ _id: _id }, (err, pedido) => {
        if (err) throw err

        if (pedido) {
            if (pedido.state == "process") {
                pedido.state = 'cancel'

                pedido.save((err, data) => {
                    if (err) throw err

                    if (data)
                        SendClient(res, { msg: "el pedido fue cancelado correctamente" })
                })
            } else {
                SendClient(res, { msg: "no se puede cancelar un pedio que esta en camino o confirmado" })
            }

        } else {
            SendClient(res, { msg: "no se ha encontrado el pedido" })
        }
    })
}

function EditPedido(_id, ids_menu, details, res) {
    Pedidos.findOne({ _id: _id }, (err, pedido) => {
        if (err) throw err

        if (pedido) {

            if (pedido.state == 'process' || pedido.state == 'received') {
                pedido.ids_menu = ids_menu
                pedido.details = details
                pedido.save((err, data) => {
                    if (err) throw err

                    if (data)
                        SendClient(res, { msg: "el pedido fue modificado correctamente" })
                })
            } else {
                let msg = "no se puede modificar un pedido en estado "
                let state_text = ''

                switch (pedido.state) {
                    case "in coming":
                        state_text = "en camino"
                        break;
                    case "cancel":
                        state_text = "cancelado"
                        break;
                    case "delivered":
                        state_text = "entregado"
                        break;
                }

                msg += state_text

                SendClient(res, { msg })
            }



        }
    })
}

module.exports = {
    CreatePedido,
    GetOrederState,
    AddDelivery,
    ConfirmOrder,
    InProcessOrder,
    // GetPedidoFromID,
    GetPedidosFromDelivery,
    GetPedidos,
    CancelPedido,
    EditPedido
}