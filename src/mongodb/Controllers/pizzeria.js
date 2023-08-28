const Pizzeria = require('../Models/pizzeria.js')
const { SendClient, DeleteImg } = require('../../tools/tools.js')

function CreatePizzeria(email, name, address, phone, user_id, res) {

    Pizzeria.findOne({ name: name, address: address }, (err, pizz) => {

        if (err) throw err

        if (!pizz) {
            const new_pizzeria = new Pizzeria()
            new_pizzeria.email = email
            new_pizzeria.menus = []
            new_pizzeria.name = name
            new_pizzeria.address = address
            new_pizzeria.phone = phone
            new_pizzeria.user_id = user_id

            let hours_days = {
                days: {
                    monday: false,
                    tuesday: false,
                    wedesday: false,
                    thursday: false,
                    friday: false,
                    saturday: false,
                    sunday: false
                },
                hours: {
                    morning: { open: '', close: '' },
                    late: { open: '', close: '' }
                }
            }

            new_pizzeria.hours_days = hours_days
            new_pizzeria.save((err, data) => {
                if (err) throw err

                if (data) {
                    let pizz = data
                    SendClient(res, { msg: "la pizzeria fue creada correctamente", pizz })
                }
            })
        } else {
            SendClient(res, { msg: "la pizzeria ya existe", pizz })
        }


    })

}

function AddCategoria(_id_pizzeria, categoria, res) {
    Pizzeria.findOne({ _id: _id_pizzeria }, (err, pizz) => {
        if (err) throw err
        if (pizz) {

            console.log(categoria)

            let index_cat = pizz.menus.findIndex(c => c.categoria === categoria)

            console.log(index_cat)
            if (index_cat === -1) {
                pizz.menus.push({ categoria, color_categoria: 'default', menu: [] })

                pizz.save((err, data) => {
                    if (err) throw err

                    if (data) {
                        SendClient(res, { msg: "la categoria fue agregada correctamente", categoria })
                    }
                })
            } else {
                SendClient(res, { msg: "la categoria de comida ya existe", pizz })
            }


        }
    })
}

function EditCategoria(_id_pizzeria, _id_cat, categoria, res) {

    Pizzeria.findOne({ _id: _id_pizzeria }, (err, pizz) => {

        if (err) throw err

        if (pizz) {
            let index_cat = pizz.menus.findIndex(c => c._id == _id_cat)

            if (index_cat !== -1) {
                pizz.menus[index_cat].categoria = categoria

                pizz.save((err, data) => {
                    if (err) throw err

                    if (data) {
                        SendClient(res, { msg: "la categoria fue editada correctamente" })
                    }
                })
            } else {
                SendClient(res, { msg: "la categoria de comida no existe" })
            }
        }
    })
}

function DeleteCategoria(_id_pizzeria, categoria, res) {
    Pizzeria.findOne({ _id: _id_pizzeria }, (err, pizz) => {

        if (err) throw err

        if (pizz) {
            let index_cat = pizz.menus.findIndex(c => c.categoria === categoria)

            if (index_cat !== -1) {

                pizz.menus[index_cat].menu.forEach(m => {
                    DeleteImg(m.img)
                });

                pizz.menus.splice(index_cat, 1)

                pizz.save((err, data) => {
                    if (err) throw err

                    if (data) {
                        SendClient(res, { msg: "la categoria fue eliminada correctamente" })
                    }
                })

            } else {
                SendClient(res, { msg: "la categoria no existe" })
            }

        }
    })
}

function AddMenu(_id_pizzeria, categoria, menu, res) {
    Pizzeria.findOne({ _id: _id_pizzeria }, (err, pizz) => {
        if (err) throw err
        if (pizz) {
            let cat_index = pizz.menus.findIndex(c => c.categoria == categoria)

            if (cat_index !== -1) {
                let menu_index = pizz.menus[cat_index].menu.findIndex(m => m == menu)

                if (menu_index === -1) {
                    console.log(menu)
                    pizz.menus[cat_index].menu.push(menu)

                    pizz.save((err, data) => {
                        if (err) throw err

                        if (data) {

                            SendClient(res, { msg: "el menu fue agregado correctamente", pizz })
                        }
                    })
                } else {
                    SendClient(res, { msg: "el menu ya fue ingresado" })
                }
            } else {
                SendClient(res, { msg: "la categoria ingresada no existe" })
            }
        }
    })
}

function EditMenu(_id_pizzeria, categoria, menu, res) {
    Pizzeria.findOne({ _id: _id_pizzeria }, (err, pizz) => {
        if (err) throw err
        if (pizz) {
            let cat_index = pizz.menus.findIndex(c => c.categoria == categoria)

            if (cat_index !== -1) {
                let menu_index = pizz.menus[cat_index].menu.findIndex(m => m._id == menu._id)

                if (menu_index !== -1) {

                    console.log(menu)

                    if (menu.img == '')
                        menu.img = pizz.menus[cat_index].menu[menu_index].img
                    else if (menu.img != pizz.menus[cat_index].menu[menu_index].img) {
                        DeleteImg('../assets/imgs/', pizz.menus[cat_index].menu[menu_index].img)
                    }


                    pizz.menus[cat_index].menu[menu_index] = menu

                    pizz.save((err, data) => {
                        if (err) throw err

                        if (data) {
                            SendClient(res, { msg: "el menu fue actualizado correctamente" })

                        }
                    })
                } else {
                    SendClient(res, { msg: "el menu no existe" })
                }
            } else {
                SendClient(res, { msg: "la categoria ingresada no existe" })
            }
        }
    })
}

function SetPortada(_id_pizzeria, categoria, menu, res) {
    Pizzeria.findOne({ _id: _id_pizzeria }, (err, pizz) => {
        if (err) throw err
        if (pizz) {
            let cat_index = pizz.menus.findIndex(c => c.categoria == categoria)

            if (cat_index !== -1) {
                let menu_index = pizz.menus[cat_index].menu.findIndex(m => m._id == menu._id)

                if (menu_index !== -1) {

                    pizz.menus.forEach(car => {
                        car.menu.forEach(m => {
                            m.portada = false
                        })
                    })

                    pizz.menus[cat_index].menu[menu_index].portada = true

                    pizz.save((err, data) => {
                        if (err) throw err

                        if (data) {
                            SendClient(res, { msg: "el menu fue actualizado correctamente" })
                        }
                    })
                } else
                    SendClient(res, { msg: "el menu no existe" })
            } else
                SendClient(res, { msg: "la categoria ingresada no existe" })
        }
    })
}

function GetMenusAtUser(user_data, _ids_menu, res) {
    Pizzeria.find({}, (err, pizz) => {
        if (err) throw err
        if (pizz) {

            const menus = []



            _ids_menu.forEach(_ids => {


                pizz.forEach(p => {


                    if (p._id.toString() == _ids._id_pizzeria.toString()) {



                        p.menus.forEach(cat => {

                            _ids.menus_id.forEach(men => {


                                cat.menu.forEach(m => {


                                    if (m._id.toString() == men._id_menu.toString()) {
                                        menus.push(m)
                                    }

                                })
                            })
                        });
                    }
                })
            })
            let oreders = []



            user_data.orders.forEach(o => {


                let total = 0
                let _id = o._id_oreder
                let titulo_arr = []
                let count = 1
                let titulo = ''
                let date = o.date.toLocaleString("en-US", { timeZone: "America/Montevideo" })
                let state = o.oreder_active
                o.menus_id.forEach(m => {

                    let temp = null
                    menus.forEach(me => {

                        if (m._id_menu == me._id) {
                            temp = me

                        }

                    })
                    if (temp != null) {
                        console.log(temp)
                        total += temp.precio
                        let t = temp.titulo + ', '
                        titulo_arr.push(t)
                    }
                })




                if (titulo_arr.length == 1) {
                    titulo = titulo_arr[0];
                    console.log('titulo_arr')
                    console.log(titulo_arr)
                } else {

                    for (let index = 0; index < titulo_arr.length - 1; index++) {
                        let index_next = index + 1
                        const current_t = titulo_arr[index];
                        const next_t = titulo_arr[index_next];

                        if (current_t == next_t) {
                            count++

                            if (index_next == titulo_arr.length - 1) {
                                if (count > 1)
                                    titulo += count + 'X ' + next_t
                                else
                                    titulo += next_t
                            }

                        } else {
                            if (count > 1)
                                titulo += count + 'X ' + current_t
                            else
                                titulo += current_t

                            count = 1
                            if (index_next == titulo_arr.length - 1) {
                                if (count > 1)
                                    titulo += count + 'X ' + next_t
                                else
                                    titulo += next_t
                            }
                        }

                    }
                }




                oreders.push({ total, titulo, date, state, _id })

            })


            SendClient(res, { msg: "Bienvenido", user_data, oreders })
        }
    })
}

function DeleteMenu(_id_menu, _id_pizzeria, categoria, res) {
    Pizzeria.findOne({ _id: _id_pizzeria }, (err, pizz) => {
        if (err) throw err
        if (pizz) {
            let cat_index = pizz.menus.findIndex(c => c.categoria == categoria)

            if (cat_index !== -1) {
                let menu_index = pizz.menus[cat_index].menu.findIndex(m => m._id == _id_menu)

                if (menu_index !== -1) {

                    DeleteImg(pizz.menus[cat_index].menu[menu_index].img)
                    pizz.menus[cat_index].menu.splice(menu_index, 1)

                    pizz.save((err, data) => {
                        if (err) throw err

                        if (data) {
                            SendClient(res, { msg: "el menu fue eliminado correctamente" })
                        }
                    })
                } else {
                    SendClient(res, { msg: "el menu no existe" })
                }
            } else {
                SendClient(res, { msg: "la categoria ingresada no existe" })
            }
        }
    })
}

function GetPizzeria(_id, res) {
    Pizzeria.findOne({ _id: _id }, (err, pizz) => {
        if (err) throw err

        if (pizz) {
            let data = {
                msg: "se envio la pizzeria",
                pizz
            }

            SendClient(res, data)
        }
    })

}

function Getpizzeria(_id) {
    const pizz = Pizzeria.findOne({ _id: _id }).exec()
    return pizz
}

function GetPizzerias(res) {
    const pizz = Pizzeria.find({}, (err, pizz) => {
        if (err) throw err
        if (pizz) {
            console.log(pizz)
            if (pizz.length > 0) {
                let hours_data = pizz[0].OpenStored()
                let data = {
                    msg: "se envio la pizzeria",
                    pizz,
                    hours_data
                }
                SendClient(res, data)
            }
        } else {
            SendClient(res, { msg: "no se encontraron las pizzerias" })
        }
    })

}

function GetSatatePizzerias(open, res) {
    Pizzeria.find({}, (err, pizz) => {
        if (err) throw err
        if (pizz) {
            let hours_data = pizz[0].OpenStored()
            if (hours_data.open == open)
                SendClient(res, { msg: "el estado de la pizzeria concide con el servidor" }, false)
            else {
                let data = {
                    msg: "el estado de la pizzeria no concide con el servidor",
                    pizz,
                    hours_data
                }
                SendClient(res, data)
            }


        } else {
            SendClient(res, { msg: "no se encontraron las pizzerias" })
        }
    })

}

function Getpizzerias(res) {
    const pizz = Pizzeria.find({}).exec()
    return pizz

}

function SendHoursAndDaysSettings(_id, hours_days, res) {

    Pizzeria.findOne({ _id: _id }, (err, pizz) => {
        if (err) throw err

        if (pizz) {

            pizz.hours_days = hours_days

            pizz.save((err, data) => {
                if (err) throw err

                if (data) {

                    SendClient(res, { msg: "los horarios y dias fueron agragados correctamente" })
                }
            })
        } else {
            SendClient(res, { msg: "no se encontro la pizzeria" })
        }
    })
}

module.exports = {
    CreatePizzeria,
    AddCategoria,
    EditCategoria,
    DeleteCategoria,
    AddMenu,
    EditMenu,
    SetPortada,
    GetMenusAtUser,
    DeleteMenu,
    GetPizzeria,
    Getpizzeria,
    GetPizzerias,
    GetSatatePizzerias,
    Getpizzerias,
    SendHoursAndDaysSettings
}