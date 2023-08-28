function OpenMenuSesion(x = null, open, porcent) {

    if (x != null)
        x.classList.toggle("change");
    let menu_nav = document.getElementsByClassName(open)
    menu_nav[0].classList.toggle('open-' + porcent)
}


window.addEventListener('load', function(event) {
    let user = localStorage.getItem('user')
    let password = localStorage.getItem('password')
    $GetElement('checkbox_login').checked = localStorage.getItem('checkbox_login')
    if ((user != '') && (password != ''))
        Login(user, password, true)
})


function Login(u = null, p = null, checked = false, click = false) {
    let user_name = $GetElement('user_login').value
    let password = $GetElement('password_login').value
    let remember = $GetElement('checkbox_login').checked

    if ((u != null) && (p != null)) {
        user_name = u
        password = p
    }

    if (remember) {
        localStorage.setItem('user', user_name)
        localStorage.setItem('password', password)
        localStorage.setItem('checkbox_login', remember)
    } else {
        localStorage.setItem('user', '')
        localStorage.setItem('password', '')
    }




    fetch('/user/login', {
            method: 'POST',
            body: JSON.stringify({ user_name, password }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {


            console.log(data)


            if (data.user_data.client) {
                if (data.user_data) {
                    let sesion = $GetElementsByTagName($GetElement('menu-nav'), 'div')
                    let sesion_panel = sesion[0]
                    let user_panel = sesion[1]


                    user_panel.style.display = 'block'

                    $GetElement('user_name').innerHTML = 'Hola: ' + data.user_data.first_name + " " + data.user_data.last_name

                    if (click)
                        OpenMenuSesion(null, 'login', '100')

                    sesion_panel.style.display = 'none'
                    user_panel.classList = 'user'


                    if (click)
                        on_overlay(data.msg + " " + data.user_data.first_name + " has click para buscar tu comida")
                    data_temp.clientId = data.user_data.id


                    let arr_orders = data.oreders.reverse();

                    console.log(data.oreders)

                    // data.oreders.forEach(o => {

                    for (let index = 0; index < data.oreders.length; index++) {
                        const o = data.oreders[index];

                        //}

                        if (o.state == "process" || o.state == "delivered" || o.state == "in coming" || o.state == "cancel") {

                            let fecha = o.date.split(' ')

                            // let date_string_american = fecha[0].split('-')
                            // let ano = date_string_american[2].substring(0, date_string_american[2].length - 1);
                            // let date_string = ano + '/' + date_string_american[1] + '/' + date_string_american[0]

                            let hours_string_arr = fecha[1].split(':')
                            let hours_string = hours_string_arr[0] + ':' + hours_string_arr[1]

                            let date = fecha[0] + ':' + hours_string

                            let state_text = 'En proceso'

                            if (o.state == 'delivered')
                                state_text = 'entregado'

                            if (o.state == 'cancel')
                                state_text = 'cancelado'



                            CreateMyOrders(o._id, date, o.titulo, state_text, 'sin delivery', '$' + o.total, o.state)


                        }

                    } //);

                } else {
                    if (!checked)
                        on_overlay(data.msg)
                }
            } else {
                localStorage.setItem('token', data.token)
                localStorage.setItem('_id', data.id)
                window.location.href = '/administracion.html'
            }





        }).catch((error) => {
            console.log(error);
        })

}



function SingIn() {
    let client = true
    let user_name = $GetElement('user_singin').value
    let first_name = $GetElement("name_singin").value
    let last_name = $GetElement("last_name_singin").value
    let email = $GetElement("email_singin").value
    let phone = $GetElement("phone_singin").value
    let address = $GetElement("address_singin").value
    let neighborhood = $GetElement("neighborhood_singin").value
    let reference = $GetElement("reference_singin").value
    let corner = $GetElement("corner_singin").value


    let password = $GetElement("password_singin").value
    let password_repeat = $GetElement("confirm_password_singin").value

    if (password === password_repeat) {
        let user_data = {
            user_name,
            first_name,
            last_name,
            email,
            phone,
            address,
            password,
            neighborhood,
            reference,
            corner,
            client
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
                OpenMenuSesion(null, 'singin', '100')
                on_overlay(data.msg)

                console.log(data)
            }).catch((error) => {
                console.log(error);
            })
    }
}


function Logoff() {
    data_temp.precio = []
    data_temp.total = 0
    data_temp.pizzId = null
    data_temp.clientId = null

    let sesion = $GetElementsByTagName($GetElement('menu-nav'), 'div')
    let sesion_panel = sesion[0]
    let user_panel = sesion[1]
    user_panel.style.display = 'none'
    sesion_panel.style.display = 'block'

    let html_titel = `<span><b>Fecha</b></span>
    <span><b>Pedido</b></span>
    <span><b>Estado</b></span>
    <span><b>Delivery</b></span>
    <span><b>Precio</b></span>`

    my_orders.innerHTML = html_titel
    my_history.innerHTML = html_titel

    localStorage.setItem('user', '')
    localStorage.setItem('password', '')
    localStorage.setItem('checkbox_login', false)

}