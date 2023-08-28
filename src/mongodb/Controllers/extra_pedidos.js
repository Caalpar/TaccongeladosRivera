const Pedidos = require('../Models/pedido.js')
    //const { Getpizzeria, Getpizzerias } = require('./pizzeria.js')
const pizzeriaControler = require('./pizzeria.js')
const userControles = require('./extra_user.js')
const { SendClient } = require('../../tools/tools.js')

function GetPedidoFromID(_id, res) {

    Pedidos.findOne({ _id: _id }, (err, pedido) => {
        if (err) throw err
        if (pedido) {
            pizzeriaControler.Getpizzeria(pedido.id_pizzeria).then(pizz => {
                if (pizz) {
                    userControles.Getclient(pedido.id_user).then(client => {
                        if (client) {
                            let menu = []
                            let oreders = []
                            let total = 0
                            let titulo = ''
                            let date = pedido.date.toLocaleString()
                            let n_order = pedido.order_number
                            let state = pedido.state
                            let count = 1
                            let open_shop = pizz.OpenStored().open

                            pedido.ids_menu.forEach(id_m => {


                                let temp_menu = null
                                pizz.menus.forEach(c => {

                                    c.menu.forEach(m => {

                                        console.log(id_m._id_menu + "::" + m.id)
                                        if (id_m._id_menu.toString() == m._id.toString()) {
                                            temp_menu = m
                                        }
                                    })

                                })

                                menu.push(temp_menu)

                            })




                            menu.forEach(m => {
                                total += m.precio
                            })


                            if (menu.length == 1) {
                                titulo = menu[0].titulo + ' '
                            } else {
                                for (let index = 0; index < menu.length - 1; index++) {

                                    let index_next = index + 1
                                    const current_t = menu[index].titulo;
                                    const next_t = menu[index_next].titulo;



                                    if (current_t == next_t) {
                                        count++

                                        if (index_next == menu.length - 1) {
                                            if (count > 1)
                                                titulo += count + 'X ' + next_t + ', '
                                            else
                                                titulo += next_t + ', '
                                        }

                                    } else {
                                        if (count > 1)
                                            titulo += count + 'X ' + current_t + ', '
                                        else
                                            titulo += current_t + ', '
                                        count = 1
                                        if (index_next == menu.length - 1) {
                                            if (count > 1)
                                                titulo += count + 'X ' + next_t + ', '
                                            else
                                                titulo += next_t + ', '
                                        }
                                    }


                                }
                            }



                            oreders.push({ total, titulo, date, state, _id, n_order })



                            if (oreders.length > 0) {

                                if (pedido.id_delivery == '') {
                                    SendClient(res, { msg: "se a encontrado el pedido correctamente", oreders, open_shop })
                                } else {
                                    deliveryControlers.GetDelivery(pedido.id_delivery).then(delivery => {
                                        if (delivery) {
                                            SendClient(res, { msg: "se a encontrado el pedido correctamente", oreders, delivery, open_shop })
                                        }
                                    }).catch((err) => { console.log(err) })
                                }

                            } else
                                SendClient(res, { msg: "no se ha encontrado el menu" })
                        } else
                            SendClient(res, { msg: "no se ha encontrado el cliente" })
                    }).catch((err) => { console.log(err) })
                } else
                    SendClient(res, { msg: "no se ha encontrado la pizzeria" })
            }).catch((err) => { console.log(err) })

        } else
            SendClient(res, { msg: "no se ha encontrado el pedido" })


    })

}

module.exports = {
    GetPedidoFromID
}