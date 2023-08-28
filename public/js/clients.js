let Clients = {}

let content_users = null
let tbody_clients = null //document.getElementById('tbody-new-order')



window.addEventListener('load', (event) => {

    let clients = document.getElementById('Clientes')

    // createClient
    let modal_add_clients = new Modal('add_clients')

    let form_create_user = document.createElement('form')
    let h1_title_new_client = document.createElement('h1')
    h1_title_new_client.innerHTML = "Crear Cliente"
    let inputfiled_user = CreateInputfiled('inputfiled_user', 'usuario')
    let inputfiled_password = CreateInputfiled('inputfiled_password', 'contraseña', 'password')
    let inputfiled_first_name = CreateInputfiled('inputfiled_first_name', 'nombre')
    let inputfiled_first_last = CreateInputfiled('inputfiled_first_last', 'apellido')
    let inputfiled_email = CreateInputfiled('inputfiled_email', 'email', 'email')
    let inputfiled_phone = CreateInputfiled('inputfiled_phone', 'celular', 'tel')
    let inputfiled_address = CreateInputfiled('inputfiled_address', 'direccion')
    let inputfiled_reference = CreateInputfiled('inputfiled_reference', 'referencia')
    let inputfiled_neighborhood = CreateInputfiled('inputfiled_neighborhood', 'barrio')
    let inputfiled_corner = CreateInputfiled('inputfiled_corener', 'entre')

    let button_add_cli = document.createElement('input')
    button_add_cli.type = 'submit'
    button_add_cli.innerHTML = 'Crear'
    button_add_cli.setAttribute("onclick", "CreateUser(event)")

    form_create_user.appendChild(h1_title_new_client)
    form_create_user.appendChild(inputfiled_user)
    form_create_user.appendChild(inputfiled_password)
    form_create_user.appendChild(inputfiled_first_name)
    form_create_user.appendChild(inputfiled_first_last)
    form_create_user.appendChild(inputfiled_email)
    form_create_user.appendChild(inputfiled_phone)
    form_create_user.appendChild(inputfiled_address)
    form_create_user.appendChild(inputfiled_reference)
    form_create_user.appendChild(inputfiled_neighborhood)
    form_create_user.appendChild(inputfiled_corner)
    form_create_user.appendChild(button_add_cli)

    modal_add_clients.setModalContent(form_create_user)

    // editClient
    let modal_edit_clients = new Modal('edit_clients')

    let form_edit_user = document.createElement('form')
    let h1_title_edit_client = document.createElement('h1')
    h1_title_edit_client.innerHTML = "Editar Cliente"
    let inputfiled_edit_user = CreateInputfiled('inputfiled_edit_user', 'telefono')
    let inputfiled_edit_first_name = CreateInputfiled('inputfiled_edit_first_name', 'nombre')
    let inputfiled_edit_first_last = CreateInputfiled('inputfiled_edit_first_last', 'apellido')
    let inputfiled_edit_email = CreateInputfiled('inputfiled_edit_email', 'email', 'email')
    let inputfiled_edit_phone = CreateInputfiled('inputfiled_edit_phone', 'celular', 'tel')
    let inputfiled_edit_address = CreateInputfiled('inputfiled_edit_address', 'direccion')
    let inputfiled_edit_reference = CreateInputfiled('inputfiled_edit_reference', 'casa/apartamento')
    let inputfiled_edit_neighborhood = CreateInputfiled('inputfiled_edit_neighborhood', 'sucursal')
    let inputfiled_edit_corner = CreateInputfiled('inputfiled_edit_corener', 'entre')

    let button_edit_cli = document.createElement('input')
    button_edit_cli.type = 'submit'
    button_edit_cli.innerHTML = 'Editar'
    button_edit_cli.setAttribute("onclick", "EditUser(event)")

    form_edit_user.appendChild(h1_title_edit_client)
    form_edit_user.appendChild(inputfiled_edit_user)
    form_edit_user.appendChild(inputfiled_edit_first_name)
    form_edit_user.appendChild(inputfiled_edit_first_last)
    form_edit_user.appendChild(inputfiled_edit_email)
    form_edit_user.appendChild(inputfiled_edit_phone)
    form_edit_user.appendChild(inputfiled_edit_address)
    form_edit_user.appendChild(inputfiled_edit_reference)
    form_edit_user.appendChild(inputfiled_edit_neighborhood)
    form_edit_user.appendChild(inputfiled_edit_corner)
    form_edit_user.appendChild(button_edit_cli)

    modal_edit_clients.setModalContent(form_edit_user)

    clients.appendChild(modal_add_clients.getModal())
    clients.appendChild(modal_edit_clients.getModal())

    setTimeout(() => {
        tbody_clients = document.getElementById('table-clientes')
        content_users = document.getElementById('content-users-new-order')


        GetAllClientes()



    }, 3000);

})

function GetAllClientes() {
    fetch('/user/all', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {

            Clients.data = data

            console.log(Clients.data)

            content_users.innerHTML = ''

            data.users.forEach((user, index) => {
                let div_user = document.createElement('div')

                div_user.id = user._id
                if (index % 2 == 0)
                    div_user.style.backgroundColor = '#f2f2f2'

                if (index == 0)
                    div_user.style.borderTop = '1px solid #f2f2f2'

                if (index == data.users.length - 1)
                    div_user.style.borderBottom = '1px solid #f2f2f2'




                div_user.style.padding = '25px'
                div_user.style.borderLeft = '1px solid #f2f2f2'
                div_user.style.borderRight = '1px solid #f2f2f2'
                div_user.style.cursor = 'pointer'

                tbody_clients.appendChild(CreateClientRow(user._id,
                    user.user_name,
                    user.first_name,
                    user.last_name,
                    user.email,
                    user.phone,
                    user.address,
                    user.neighborhood,
                    user.reference,
                    user.corner))

                div_user.innerHTML = user.user_name + " : " + user.first_name + ' ' + user.last_name
                    //div_user.innerHTML = user.first_name + ' ' + user.last_name


                div_user.setAttribute('ondblclick', 'SelectClient(this)')
                div_user.setAttribute('ontouchend', 'SelectClient(this)')

                content_users.appendChild(div_user)
            });

            // on_overlay(data.msg)
            //  window.location.href = '/' + data.link + data.user_name + '&' + data.token


        }).catch((error) => {
            console.log(error);
        })
}

function SelectClient(client) {
    label_client = document.getElementById('client-label-new-oreder')
    label_client.innerHTML = 'Cliente: ' + client.innerHTML
    console.log(client.id)
    Clients.selected_to_new_order = client.id
    document.getElementById('close_modal_client-new-order').click()
}


function SearchClient(word) {
    let w = word.value.toUpperCase();
    let users = content_users.getElementsByTagName('div')

    for (let index = 0; index < users.length; index++) {
        const user = users[index].innerHTML.toUpperCase();
        if (user.indexOf(w) > -1) {
            users[index].style.display = ''
        } else {
            users[index].style.display = 'none'
        }
    }


}


function CreateClientRow(_id, usuario, nombre, apellido, email, phone, direccion, referencia, barrio, esquina) {

    let tr = document.createElement('tr')
    tr.id = _id
    let td_usuario = CreateColum(usuario)
    let td_nombre = CreateColum(nombre)
    let td_apellido = CreateColum(apellido)
    let td_email = CreateColum(email)
    let td_phone = CreateColum(phone)
    let td_direccion = CreateColum(direccion)
    let td_referencia = CreateColum(referencia)
    let td_barrio = CreateColum(barrio)
    let td_esquina = CreateColum(esquina)

    tr.appendChild(td_usuario)
    tr.appendChild(td_nombre)
    tr.appendChild(td_apellido)
    tr.appendChild(td_email)
    tr.appendChild(td_phone)
    tr.appendChild(td_direccion)
    tr.appendChild(td_barrio)
    tr.appendChild(td_referencia)
    tr.appendChild(td_esquina)

    tr.setAttribute('onclick', 'Select(event,this,"tbody-clientes")')

    return tr

}


function ModaAddClients() {
    document.getElementById("modal_add_clients").style.display = 'block';
}

function ModaEditClients() {

    let [user, nombre, apellido, email, tel, dir, ref, barrio, entre] = temp.select_client.cells



    document.getElementById('inputfiled_edit_user').value = user.innerHTML
    document.getElementById("inputfiled_edit_first_name").value = nombre.innerHTML
    document.getElementById("inputfiled_edit_first_last").value = apellido.innerHTML
    document.getElementById("inputfiled_edit_email").value = email.innerHTML
    document.getElementById("inputfiled_edit_phone").value = tel.innerHTML
    document.getElementById("inputfiled_edit_address").value = dir.innerHTML
    document.getElementById("inputfiled_edit_neighborhood").value = ref.innerHTML
    document.getElementById("inputfiled_edit_reference").value = barrio.innerHTML
    document.getElementById("inputfiled_edit_corener").value = entre.innerHTML


    document.getElementById("modal_edit_clients").style.display = 'block';
}


function CreateUser(e) {

    e.preventDefault()

    let client = true
    let user_name = document.getElementById('inputfiled_user').value
    let first_name = document.getElementById("inputfiled_first_name").value
    let last_name = document.getElementById("inputfiled_first_last").value
    let email_obj = document.getElementById("inputfiled_email")
    let phone = document.getElementById("inputfiled_phone").value
    let address = document.getElementById("inputfiled_address").value
    let neighborhood = document.getElementById("inputfiled_neighborhood").value
    let reference = document.getElementById("inputfiled_reference").value
    let corner = document.getElementById("inputfiled_corener").value
    let password = document.getElementById("inputfiled_password").value
    let email = email_obj.value

    {
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

                if (data)
                    alert(data.msg)

                location.reload();

            }).catch((error) => {
                console.log(error);
            })
    }

}


function EditUser(e) {

    e.preventDefault()

    let client = true
    let user_name = document.getElementById('inputfiled_edit_user').value
    let first_name = document.getElementById("inputfiled_edit_first_name").value
    let last_name = document.getElementById("inputfiled_edit_first_last").value
    let email_obj = document.getElementById("inputfiled_edit_email")
    let phone = document.getElementById("inputfiled_edit_phone").value
    let address = document.getElementById("inputfiled_edit_address").value
    let neighborhood = document.getElementById("inputfiled_edit_neighborhood").value
    let reference = document.getElementById("inputfiled_edit_reference").value
    let corner = document.getElementById("inputfiled_edit_corener").value

    let email = email_obj.value

    let _id = temp.select_client.id


    let user_data = {
        _id,
        user_name,
        first_name,
        last_name,
        email,
        phone,
        address,
        neighborhood,
        reference,
        corner,
        client
    }

    fetch('/user/edit', {
            method: 'POST',
            body: JSON.stringify(user_data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {

            if (data)
                alert(data.msg)

            location.reload();

        }).catch((error) => {
            console.log(error);
        })

}