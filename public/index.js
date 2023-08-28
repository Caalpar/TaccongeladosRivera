let id = 0;

let id_cat = 0;

let data_temp = {
    precio: [],
    total: 0,
    pizzId: null,
    clientId: null
}


window.addEventListener("load", function(event) {

    let mobile = window.matchMedia("(max-width: 800px)")
    if (mobile.matches) {
        window.location.href = '/mobile.html'
    }




    GetPizzerias()
    let table_pending = document.getElementById('table-oreder-pending').rows




    let index = 0

    setInterval(() => {

        if (table_pending.length > 0) {
            console.log()

            GetOrederState(table_pending[index].id, table_pending, index)

            index++

            if (index == table_pending.length)
                index = 0
        }
    }, 1000);

});

function GetOrederState(id, table, index) {



    fetch('/pedido/' + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {

            if (data.delivery) {
                let name = data.delivery._name + ' ' + data.delivery.last_name
                table[index].cells[3].innerHTML = name
                table[index].cells[2].innerHTML = 'En camino'
            }



        }).catch((error) => {
            console.log(error);
        })
}

function GetPizzerias() {

    fetch('/pizzeria/pizzrias', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {

            let menus_list = document.getElementById('menus')

            let categoria = data.pizz[0].menus
            data_temp.pizzId = data.pizz[0]._id
            console.log(data_temp.pizzId)
            categoria.forEach(menus => {
                let new_cat = new Categoria(menus._id, menus.categoria)
                menus.menu.forEach(m => {
                    let new_menu = new Menu(m._id, menus._id, './imge/' + m.img, m.titulo, m.precio, m.descripcion, m.disponibilidad)
                    new_cat.add_menu(new_menu)
                })
                menus_list.innerHTML += new_cat.get_categoria()
            });

        }).catch((error) => {
            console.log(error);
        })

}


function openAcordion(acordion) {
    acordion.classList.toggle("active");
    let panel = acordion.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
}

let singIn = document.getElementById('singin');
let login = document.getElementById('login');
let my_oreders = document.getElementById('my-oreders');
document.getElementById("defaultOpen").click();

function SingIn() {
    let user_name = document.getElementById('user_singin').value
    let client = true
    let phone = document.getElementById("phone_singin").value
    let address = document.getElementById("address_singin").value
    let last_name = document.getElementById("last_name_singin").value
    let first_name = document.getElementById("name_singin").value
    let email = document.getElementById("email_singin").value

    let password = document.getElementById("password_singin").value
    let password_repeat = document.getElementById("password_repeat_singin").value

    console.log('hola')

    if (password === password_repeat) {
        let user_data = {
            user_name,
            client,
            phone,
            address,
            last_name,
            first_name,
            email,
            password
        }

        fetch('/user/create', {
                method: 'POST',
                body: JSON.stringify(user_data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {

                on_overlay(data.msg)
                    //  window.location.href = '/' + data.link + data.user_name + '&' + data.token

                console.log(data)
            }).catch((error) => {
                console.log(error);
            })
    }
}

function Login() {

    let user_name = document.getElementById('user_login').value
    let password = document.getElementById('password_login').value
    let remember = document.getElementById('remember').value



    fetch('/user/login', {
        method: 'POST',
        body: JSON.stringify({ user_name, password }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            return response.json();
        })
        .then(data => {

            console.log(data)
            if (data.user_data.client) {
                on_overlay(data.msg + " " + data.user_data.first_name + " has click para buscar tu comida")
                document.getElementById('btn-login-singin').style.display = "none"
                document.getElementById('user_display').style.display = "block"
                document.getElementById('user').innerHTML = 'Hola: ' + data.user_data.first_name + " " + data.user_data.last_name
                data_temp.clientId = data.user_data.id

                data.oreders.forEach(o => {

                    if (o.state == "process") {



                        let fecha = o.date.split(' ')

                        let date_string_american = fecha[0].split('-')
                        let date_string = date_string_american[2] + '/' + date_string_american[1] + '/' + date_string_american[0]

                        let hours_string_arr = fecha[1].split(':')
                        let hours_string = hours_string_arr[0] + ':' + hours_string_arr[1]

                        let table_pending = document.getElementById('table-oreder-pending')
                        let row = table_pending.insertRow(0);
                        row.id = o._id
                        let cell1 = row.insertCell(0);
                        let cell2 = row.insertCell(1);
                        let cell3 = row.insertCell(2);
                        let cell4 = row.insertCell(3);
                        let cell5 = row.insertCell(4);
                        cell1.innerHTML = date_string + ':' + hours_string
                        cell2.innerHTML = o.titulo
                        cell3.innerHTML = 'En proceso'
                        cell4.innerHTML = 'sin delivery'
                        cell5.innerHTML = '$' + o.total
                    }

                });

            } else {
                localStorage.setItem('token', data.token)
                localStorage.setItem('_id', data.id)
                window.location.href = '/administracion.html'
            }


        }).catch((error) => {
            console.log(error);
        })


}


function Logoff() {
    document.getElementById('btn-login-singin').style.display = "block"
    document.getElementById('user_display').style.display = "none"
    document.getElementById('user').innerHTML = ''
}


function on_overlay(msg) {
    let overlay = document.getElementById("overlay");
    overlay.style.display = "block"
    overlay.getElementsByTagName('div')[0].innerHTML = msg
}

function off_overlay() {
    NotSeeSingIn()
    NotSeeLogIn()
    document.getElementById("overlay").style.display = "none";
}

function openOredersAndHistory(oreder, elmnt, color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    let order = document.getElementById(oreder)
    elmnt.style.backgroundColor = color;
    order.style.backgroundColor = color;
    order.style.display = "block";

}



function SeeSingIn() {
    singIn.style.display = "block";
}

function NotSeeSingIn() {
    singIn.style.display = "none";
}

function SeeMyOreders() {
    my_oreders.style.display = "block";
}

function NotMyOreders() {
    my_oreders.style.display = "none";
}




function SeeLogIn() {
    login.style.display = "block";
}

function NotSeeLogIn() {
    login.style.display = "none";
}

function addorder(oreder) {
    let see = oreder.classList.toggle("order")
    let id = oreder.id.split('_')
    let new_id = id[1] + '?' + id[2]
    if (see) {


        let menu = oreder.getElementsByTagName("div")[1].innerHTML.split('<')
        let menu_title = menu[2].split('>')[1]
        let menu_price = parseInt(menu[4].split('>')[1].substring(1))
        let tbody = document.getElementById('tbody')
        let reslut = new ListPedido(new_id, 1, menu_title, menu_price)

        data_temp.precio.push({
            price: menu_price,
            id_pedido: new_id,
            id_menu: oreder.id
        })
        data_temp.total += menu_price



        tbody.innerHTML += reslut.get_pedido()

        updateTotal()
    } else {
        let menu = document.getElementById('menu_' + new_id)
        let price = parseInt(menu.getElementsByTagName('td')[2].innerHTML.substring(1))
        data_temp.total -= price
        updateTotal()
        menu.remove()
    }

}

function showoreders() {
    let show = document.getElementById("oreder")


    show.classList.toggle("show-oreder")

}

function summenu(count) {
    console.log(count)
        //let conut_element = count.getElementById('count')

    //  let num = conut_element.value++
    //    conut_element.innerHTML = num

}

function restmenu(count) {

}

function addNewOrder(descripion, price, multiplicador) {




}


class ListPedido {
    constructor(id, cont, description, price) {
        this.id = id
        this.cont = cont
        this.description = description
        this.price = price
    }


    get_pedido() {
        return ` <tr id="menu_${this.id}">
        <td>
            <button class="btn-count" onclick="remove_pedido(this)">-</button><span class="count" id="count">${this.cont}</span><button class="btn-count" onclick="add_pedido(this)">+</button>
        </td>
        <td>
            <div class="text-count">${this.description}</div>
        </td>
            <td id="price">$${this.price}</td>
        </tr>`
    }



}


function add_pedido(datos) {
    if (data_temp.precio.length > 0) {
        let data = datos.previousSibling.parentElement.previousSibling.parentElement.getElementsByTagName("td")

        let id = datos.previousSibling.parentElement.previousSibling.parentElement.id.split('_')[1]

        let index_price = data_temp.precio.findIndex(p => p.id_pedido === id)


        if (index_price !== -1) {
            let precio = data_temp.precio[index_price].price

            let countHTML = data[0].getElementsByTagName("span")[0]
            let priceHTML = data[2]

            let count = parseInt(countHTML.innerHTML)

            count++

            data_temp.total += precio

            precio *= count

            countHTML.innerHTML = count
            priceHTML.innerHTML = '$' + precio


            updateTotal()
        }
    }


}

function updateTotal() {
    total = document.getElementById('total')
    total.innerHTML = '$' + data_temp.total
}



function remove_pedido(datos) {
    if (data_temp.precio.length > 0) {
        let data = datos.previousSibling.parentElement.previousSibling.parentElement.getElementsByTagName("td")

        let id = datos.previousSibling.parentElement.previousSibling.parentElement.id.split('_')[1]



        let index_price = data_temp.precio.findIndex(p => p.id_pedido === id)

        if (index_price !== -1) {
            let precio = data_temp.precio[index_price].price
            let countHTML = data[0].getElementsByTagName("span")[0]
            let priceHTML = data[2]

            let count = parseInt(countHTML.innerHTML)

            count--

            if (count > 0)
                data_temp.total -= precio


            if (count < 1)
                count = 1

            precio *= count

            countHTML.innerHTML = count
            priceHTML.innerHTML = '$' + precio

            updateTotal()
        }
    }
}

class Categoria {
    constructor(id, cat_name) {
        this.id = id
        this.cat_name = cat_name
        this.menus = []
    }

    add_menu(menu) {
        this.menus.push(menu)
    }

    remove_menu(index) {
        this.menus.splice(index, 1)
    }

    get_categoria() {
        let result = ''
        this.menus.forEach(menu => {
            result += menu.get_menu()
        });

        return `<button class = "accordion" id="cat_${this.id}" onclick="openAcordion(this)">${this.cat_name}</button>
        <div class = "panel" id="cat_${this.id}">
            ${result}
        </div>`
    }

}

class Menu {
    constructor(id, cat_id, image, titel_menu, price, descripion, disponible) {
        this.id = id
        this.cat_id = cat_id
        this.image = image
        this.titel_menu = titel_menu,
            this.price = price
        this.descripion = descripion
        this.disponible = disponible


    }
    get_menu() {

        let enabled = ''
        let addorder_function = 'onclick="addorder(this)"'
        let btn_addorder = '<div class = "addorder"></div>'

        if (!this.disponible) {
            enabled = '<div class="triangle"></div>'
            addorder_function = ''
            btn_addorder = ''
        }

        return `<div class ="food" ${addorder_function} id="menu_${this.id + '_' + this.cat_id}">
        ${enabled}
        <img src="${this.image}" alt="Norway" style="width:100%"> 
        ${btn_addorder}
        <div class ="food-description">
          
          <p><b>${this.titel_menu}</b><span class="food-price">$${this.price}</span></p>      
          <p>${this.descripion}</p>           
        </div></div>`
    }




}

function Responsive_Menu() {
    var x = document.getElementById("navbar");
    if (x.className === "navbar") {
        x.className = "responsive";
    } else {
        x.className = "navbar";
    }
}

function CreatePedido() {
    let data = document.getElementById('tbody').getElementsByTagName('tr')

    let new_oreder = []

    for (let index = 0; index < data.length; index++) {
        const ped = data[index];

        let id = ped.id.split('_')[1].split('?')[0]
        let count = ped.getElementsByTagName('td')[0].getElementsByTagName('span')[0].innerHTML

        for (let index = 0; index < count; index++) {

            new_oreder.push(id)
        }



    }

    if ((data_temp.clientId != null) && (data_temp.pizzId !== null) && (new_oreder.length > 0)) {


        let order = {
            id_cliente: data_temp.clientId,
            id_Pizzeria: data_temp.pizzId,
            ids_menu: new_oreder,
            details: document.getElementById('details').value
        }

        fetch('/pedido/create', {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)

                if (data) {

                    on_overlay('Hemos cargado tu pedido, puedes ver su estado en <br>"Mis Pedidos"')

                    let table_pending = document.getElementById('table-oreder-pending')
                    let tbody = document.getElementById('tbody')
                    let panels = document.getElementsByClassName('food order')

                    for (let index = 0; index < panels.length; index++) {
                        const element = panels[index];
                        element.className = 'food'
                    }

                    data.oreders.forEach(o => {
                        let fecha = o.date.split(' ')

                        let date_string_american = fecha[0].split('-')
                        let date_string = date_string_american[2] + '/' + date_string_american[1] + '/' + date_string_american[0]

                        let hours_string_arr = fecha[1].split(':')
                        let hours_string = hours_string_arr[0] + ':' + hours_string_arr[1]

                        let row = table_pending.insertRow(0);
                        row.id = o._id
                        let cell1 = row.insertCell(0);
                        let cell2 = row.insertCell(1);
                        let cell3 = row.insertCell(2);
                        let cell4 = row.insertCell(3);
                        let cell5 = row.insertCell(4);
                        cell1.innerHTML = date_string + ':' + hours_string
                        cell2.innerHTML = o.titulo
                        cell3.innerHTML = 'En proceso'
                        cell4.innerHTML = 'sin delivery'
                        cell5.innerHTML = '$' + o.total
                    })

                    tbody.innerHTML = ''
                }





            }).catch((error) => {
                console.log(error);
            })

    } else if ((new_oreder.length == 0) && (data_temp.clientId !== null)) {
        console.log('Seleccione su comida antes de realizar el pedido')
        on_overlay('Seleccione su comida antes de realizar el pedido')
    } else if (data_temp.clientId == null) {
        console.log('inicie Sesion o Registrese para hacer el pedido')
        on_overlay('Inicie Sesion o Registrese para hacer el pedido')
    }

}

function GetStateOreder(_id_oreder) {
    fetch(`/pedido/${_id_oreder}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {

            // on_overlay(data.msg)
            //  window.location.href = '/' + data.link + data.user_name + '&' + data.token

            console.log(data)
        }).catch((error) => {
            console.log(error);
        })
}