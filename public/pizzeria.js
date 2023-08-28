window.addEventListener("load", function(event) {

    let open_acordion = localStorage.getItem('open-acordion')



    if (open_acordion) {
        document.getElementById(open_acordion).click();
    } else
        document.getElementById("open-pedidos").click();

    GetALllDeliverys()
    if (id === null) {
        CreatePizzeria(id)
        setTimeout(() => {
            location.reload();
        }, 1000);
    } else {
        start()
    }
})

function start() {
    CreatePizzeria(id)

    setTimeout(() => {

        let menus = document.getElementById('Menus')
        let pedidos = document.getElementById('Pedidos')
        let deliverys = document.getElementById('Deliverys')
        let categorias = new Modal('categoria')
        let menu = new Modal('menu')
        let delivery = new Modal('delivery')
        let new_order = new Modal('new-order')
        let new_order_client = new Modal('client-new-order', '4')

        //elementos del modal del nuevo pedido
        let h1_new_order = document.createElement('h1')
        h1_new_order.innerHTML = 'Agregar Pedido'

        let table_new_oreder = document.createElement('table')
        let table_oreder = document.createElement('table')
        table_oreder.id = 'table_oreder'
        let div_new_oreder_row = document.createElement('div')
        let div_new_oreder_col = document.createElement('div')
        let div_new_oreder_col2 = document.createElement('div')

        div_new_oreder_row.style.display = 'flex'
        div_new_oreder_row.style.marginLeft = '-5px'
        div_new_oreder_row.style.marginRight = '-5px'

        div_new_oreder_col.style.flex = '50%'
        div_new_oreder_col.style.padding = '5px'
        div_new_oreder_col.style.height = '12em'
        div_new_oreder_col.style.overflow = 'auto'

        div_new_oreder_col2.style.flex = '50%'
        div_new_oreder_col2.style.padding = '5px'

        table_oreder.setAttribute('class', 'table-menu')
        let table_oreder_header = document.createElement('thead')
        let table_oreder_header_colum_0 = document.createElement('th')
        let table_oreder_header_colum_1 = document.createElement('th')
        let table_oreder_header_colum_2 = document.createElement('th')
        let table_oreder_header_colum_3 = document.createElement('th')
        let table_oreder_header_colum_4 = document.createElement('th')
        let table_oreder_tbody = document.createElement('tbody')
        let table_oreder_tfoot = document.createElement('tfoot')
        let tfoot_oreder_tr = document.createElement('tr')
        let tfoot_oreder_td_total = document.createElement('td')
        let tfoot_oreder_td_relleno = document.createElement('td')
        let tfoot_oreder_td_price = document.createElement('td')
        tfoot_oreder_td_price.id = 'oreder-td-price'
        tfoot_oreder_td_price.innerHTML = '$0'
        tfoot_oreder_td_total.innerHTML = "Total: "
        tfoot_oreder_td_relleno.colSpan = '3'

        tfoot_oreder_tr.appendChild(tfoot_oreder_td_relleno)
        tfoot_oreder_tr.appendChild(tfoot_oreder_td_total)
        tfoot_oreder_tr.appendChild(tfoot_oreder_td_price)
        table_oreder_tfoot.appendChild(tfoot_oreder_tr)

        table_oreder_tbody.id = 'tbody-order'

        table_oreder_header_colum_0.innerHTML = 'categoria'
        table_oreder_header_colum_1.innerHTML = 'título'
        table_oreder_header_colum_2.innerHTML = 'precio'
        table_oreder_header_colum_3.innerHTML = 'descripción'
        table_oreder_header_colum_4.innerHTML = 'eliminar'


        table_oreder_header.appendChild(table_oreder_header_colum_0)
        table_oreder_header.appendChild(table_oreder_header_colum_1)
        table_oreder_header.appendChild(table_oreder_header_colum_2)
        table_oreder_header.appendChild(table_oreder_header_colum_3)
        table_oreder_header.appendChild(table_oreder_header_colum_4)

        table_oreder.appendChild(table_oreder_header)
        table_oreder.appendChild(table_oreder_tbody)
        table_oreder.appendChild(table_oreder_tfoot)


        table_new_oreder.setAttribute('class', 'table-menu')
        let table_new_oreder_header = document.createElement('thead')
        let table_new_oreder_header_colum_0 = document.createElement('th')
        let table_new_oreder_header_colum_1 = document.createElement('th')
        let table_new_oreder_header_colum_2 = document.createElement('th')
        let table_new_oreder_header_colum_3 = document.createElement('th')
        let table_new_oreder_header_colum_4 = document.createElement('th')
        let table_new_oreder_tbody = document.createElement('tbody')
        table_new_oreder_tbody.id = 'tbody-new-order'

        table_new_oreder_header_colum_0.innerHTML = 'categoria'
        table_new_oreder_header_colum_1.innerHTML = 'título'
        table_new_oreder_header_colum_2.innerHTML = 'precio'
        table_new_oreder_header_colum_3.innerHTML = 'disponibilidad'
        table_new_oreder_header_colum_4.innerHTML = 'agregar'

        table_new_oreder_header.appendChild(table_new_oreder_header_colum_0)
        table_new_oreder_header.appendChild(table_new_oreder_header_colum_1)
        table_new_oreder_header.appendChild(table_new_oreder_header_colum_2)
        table_new_oreder_header.appendChild(table_new_oreder_header_colum_3)
        table_new_oreder_header.appendChild(table_new_oreder_header_colum_4)

        table_new_oreder.appendChild(table_new_oreder_header)
        table_new_oreder.appendChild(table_new_oreder_tbody)

        div_new_oreder_col.appendChild(table_new_oreder)
        div_new_oreder_col2.appendChild(table_oreder)
        div_new_oreder_row.appendChild(div_new_oreder_col)
        div_new_oreder_row.appendChild(div_new_oreder_col2)

        let client_label_new_oreder = document.createElement('label')
        client_label_new_oreder.id = 'client-label-new-oreder'
        client_label_new_oreder.style.padding = '0 15px 0 0'

        let contetnt_btn_new_oreder = document.createElement('div')

        let div_forma_de_pago = Create('div')
        let titel_forma_de_pago = Create('h3')
        titel_forma_de_pago.innerHTML = 'Forma de pago'
        let dorp_forma_de_pago = new DropDown('dorp-forma-de-pago')
        dorp_forma_de_pago.addOption('Efectivo')
        dorp_forma_de_pago.addOption('Devito')
        dorp_forma_de_pago.addOption('Credito')

        div_forma_de_pago.appendChild(titel_forma_de_pago)
        div_forma_de_pago.appendChild(dorp_forma_de_pago.getDrop())

        let div_text_area = Create('div')
        let titel_text_area = Create('h3')
        titel_text_area.innerHTML = 'Detalles'
        let text_area = Create('textarea')
        text_area.id = 'text-new-oreder'
        text_area.style.width = '80%'
        text_area.style.height = '10vh'
        text_area.style.resize = 'none'
        div_text_area.appendChild(titel_text_area)
        div_text_area.appendChild(text_area)

        let button_new_oreder = document.createElement('button')
        button_new_oreder.type = 'submit'
        button_new_oreder.classList.add('p-10px')
        button_new_oreder.style.backgroundColor = '#04AA6D'
        button_new_oreder.style.color = 'white'
        button_new_oreder.style.border = 'none'
        button_new_oreder.style.fontWeight = '900'
        button_new_oreder.innerHTML = 'Crear Pedido'
        button_new_oreder.setAttribute("onclick", "AddNewOreder()")
        button_new_oreder.id = 'btn-create-order'

        contetnt_btn_new_oreder.appendChild(button_new_oreder)

        let content_client_new_order = document.createElement('div')

        let button_add_client = document.createElement('button')
        button_add_client.type = 'submit'
        button_add_client.classList.add('p-10px', 'mr-1p')
        button_add_client.innerHTML = 'Buscar Cliente'
        button_add_client.setAttribute("onclick", "ModalAddClientToOrder()")

        content_client_new_order.appendChild(button_add_client)
        content_client_new_order.appendChild(client_label_new_oreder)

        let dorp_cat_search_label = CreateLabel('', 'Buscar por categoria')
        let dorp_cat_search = new DropDown('dorp-cat-search')
        dorp_cat_search.addAttribute('onchange', 'SeachCatInDrop("tbody-new-order","dorp-cat-search")')

        let menus_to_search = JSON.parse(localStorage.getItem('categorias'))

        dorp_cat_search.addOption('ALL')
        for (let index = 0; index < menus_to_search.length; index++) {
            const cat = menus_to_search[index].categoria;
            dorp_cat_search.addOption(cat)
        }

        let client_search_label = document.createElement('h1')
        client_search_label.innerHTML = "Clientes"

        let input_search_label = CreateLabel('', 'Buscar por producto')

        let input_search_menu = CreateInputfiled('menu-new-order-search', 'Buscar', 'text')
        input_search_menu.setAttribute('onkeyup', 'SearchMenu(this,"tbody-new-order")')


        //------------------------------------------------------------------------------------------------------

        //new_order_client

        let input_search = CreateInputfiled('client-new-order-search', 'Buscar', 'text')
        input_search.setAttribute('onkeyup', 'SearchClient(this)')
        let content_users = document.createElement('div')
        content_users.id = 'content-users-new-order'

        new_order_client.setModalContent(client_search_label)
        new_order_client.setModalContent(input_search)
        new_order_client.setModalContent(content_users)
        new_order.setModalContent(h1_new_order)
        new_order.setModalContent(content_client_new_order)
        new_order.setModalContent(dorp_cat_search_label)
        new_order.setModalContent(dorp_cat_search.getDrop())
        new_order.setModalContent(input_search_label)
        new_order.setModalContent(input_search_menu)
        new_order.setModalContent(div_new_oreder_row)
        new_order.setModalContent(div_forma_de_pago)
        new_order.setModalContent(div_text_area)
        new_order.setModalContent(contetnt_btn_new_oreder)
        new_order.setModalContent(new_order_client.getModal())

        pedidos.appendChild(new_order.getModal())
            // elementos del modal del delivery
        let h1_delivery = document.createElement('h1')
        let form_delivery_add = document.createElement('form')
        h1_delivery.innerHTML = 'Crear Delivery'
        let inputfiled_delivery_nombre = CreateInputfiled('inputfiled_delivery_nombre', 'nombre')
        inputfiled_delivery_nombre.required = true
        let inputfiled_delivery_apellido = CreateInputfiled('inputfiled_delivery_apellido', 'apellido')
        inputfiled_delivery_apellido.required = true
        let inputfiled_delivery_matricula = CreateInputfiled('inputfiled_delivery_matricula', 'matricula')
        inputfiled_delivery_matricula.required = true
        let inputfiled_delivery_vehiculo = CreateInputfiled('inputfiled_delivery_vehiculo', 'vehiculo')
        inputfiled_delivery_vehiculo.required = true

        let button_delivery = document.createElement('button')
        button_delivery.type = 'submit'
        button_delivery.innerHTML = 'Crear'
        button_delivery.setAttribute("onclick", "CreateDelivery()")
        form_delivery_add.appendChild(h1_delivery)
        form_delivery_add.appendChild(inputfiled_delivery_nombre)
        form_delivery_add.appendChild(inputfiled_delivery_apellido)
        form_delivery_add.appendChild(inputfiled_delivery_matricula)
        form_delivery_add.appendChild(inputfiled_delivery_vehiculo)
        form_delivery_add.appendChild(button_delivery)

        delivery.setModalContent(form_delivery_add)

        // elementos del modal de menu
        let h1_menu = document.createElement('h1')
        h1_menu.innerHTML = 'Crear Producto'

        let form_c_menu = document.createElement('form')
        let inputfiled_menu_precio = CreateInputfiled('inputfiled_menu_precio', 'precio', 'number')
        let inputfiled_menu_titulo = CreateInputfiled('inputfiled_menu_titulo', 'titulo')
        let inputfiled_menu_descripcion = CreateInputfiled('inputfiled_menu_descripcion', 'descripcion')

        let content_dis = document.createElement('div')

        let label_dis = CreateLabel('label_disponibilidad', 'disponibilidad')
        label_dis.style.marginRight = "1%"
        let CheckBox_menu_disponibilidad = CreateCheckBox('checkbox_menu_disponivilidad')

        content_dis.appendChild(label_dis)
        content_dis.appendChild(CheckBox_menu_disponibilidad)

        let label_foto_menu = CreateLabel('label_foto_menu', 'Foto del producto')
        let UploadFile = CreateFileUpload('upload_file', 'image')

        let content_cat = document.createElement('div')

        let label_drop = CreateLabel('label_cat', 'categoria')
        label_drop.style.marginRight = "2%"
        let drop = new DropDown('drop_cat_menu')
        drop.setClass('p-10px')

        content_cat.appendChild(label_drop)
        content_cat.appendChild(drop.getDrop())

        inputfiled_menu_precio.required = true
        inputfiled_menu_titulo.required = true
        UploadFile.required = true
        UploadFile.multiple = true

        if (pizz !== null) {
            pizz.menus.forEach(menus => {
                drop.addOption(menus.categoria)
            });
        }

        let button_menu = document.createElement('button')
        button_menu.type = 'submit'
        button_menu.innerHTML = 'Crear'


        button_menu.setAttribute("onclick", "CreateMenu(event)")

        form_c_menu.appendChild(h1_menu)
        form_c_menu.appendChild(inputfiled_menu_precio)
        form_c_menu.appendChild(inputfiled_menu_titulo)
        form_c_menu.appendChild(inputfiled_menu_descripcion)
        form_c_menu.appendChild(content_dis)

        form_c_menu.appendChild(content_cat)
            // form_c_menu.appendChild(drop.getDrop())
        form_c_menu.appendChild(label_foto_menu)
        form_c_menu.appendChild(UploadFile)
        form_c_menu.appendChild(button_menu)

        menu.setModalContent(form_c_menu)

        // elementos del modal de categoria
        let form_cat_create = document.createElement('form')

        let h1_cat = document.createElement('h1')
        h1_cat.innerHTML = 'Crear Categoria'


        let inputfiled_cat = CreateInputfiled('inputfiled_categoria', 'categoria')
        inputfiled_cat.required = true
        inputfiled_cat.style.padding = '10px'
        inputfiled_cat.style.marginRight = '1%'

        let button_cat = document.createElement('button')
        button_cat.innerHTML = 'Crear'
        button_cat.style.padding = '10px'

        let content_create_cat = document.createElement('div')

        content_create_cat.appendChild(inputfiled_cat)
        content_create_cat.appendChild(button_cat)

        button_cat.setAttribute("onclick", "CreateCategoria()")

        form_cat_create.appendChild(h1_cat)
        form_cat_create.appendChild(content_create_cat)
            //form_cat_create.appendChild(button_cat)

        categorias.setModalContent(form_cat_create)


        CreateModalEditorder(pedidos)

        menus.appendChild(menu.getModal())
        menus.appendChild(categorias.getModal())
        deliverys.appendChild(delivery.getModal())
    }, 1000);
}


function SearchOrderFromState(word, id, i) {
    let w = word.value.toUpperCase();

    let tbody_tr = document.getElementById(id).rows

    for (let index = 0; index < tbody_tr.length; index++) {
        const tr = tbody_tr[index];
        const td = tr.cells[i];
        let value_search = td.innerHTML

        if (value_search.toUpperCase().indexOf(w) > -1 || w == 'ALL')
            tr.style.display = ''
        else
            tr.style.display = 'none'

    }
}



function SearchOrder(word, id, i) {
    let w = word.value.toUpperCase();

    let tbody_tr = document.getElementById(id).rows


    for (let index = 0; index < tbody_tr.length; index++) {
        const tr = tbody_tr[index];
        const td = tr.cells[i];
        let value_search = td.innerHTML

        if (value_search.toUpperCase().indexOf(w) > -1)
            tr.style.display = ''
        else
            tr.style.display = 'none'

    }
}

function SearchMenu(word, id) {
    let w = word.value.toUpperCase();

    let tbody_tr = document.getElementById(id).rows


    for (let index = 0; index < tbody_tr.length; index++) {
        const tr = tbody_tr[index];
        let value_search = ''

        for (let i = 0; i < tr.cells.length - 1; i++) {
            const td = tr.cells[i];
            value_search += td.innerHTML + ' '
        }

        if (value_search.toUpperCase().indexOf(w) > -1)
            tr.style.display = ''
        else
            tr.style.display = 'none'

    }
}


function ModaAddOreder() {
    document.getElementById("modal_new-order").style.display = 'block';
}

function ModalEditOreder() {



    let praice_menu = []

    let tbody_order_edit_2 = document.getElementById('tbody-oreder-edit-2')

    let tbody_order_edit_2_rows = tbody_order_edit_2.rows



    if (tbody_order_edit_2 != null) {
        while (tbody_order_edit_2.hasChildNodes()) {
            tbody_order_edit_2.removeChild(tbody_order_edit_2.firstChild);
        }
    }

    if (temp.select_oreder) {

        let oreder_to_edit = document.getElementById(temp.select_oreder.id).getElementsByTagName('td')

        let tbody_order_edit = document.getElementById('tbody-oreder-edit-1').rows //[0].cells[4].childNodes[0].click()


        let total = document.getElementById('oreder-edit-td-price')
        let total_calc = 0

        let user = document.getElementById('user-order-to-edit')
        let n_order = document.getElementById('oreder-number-to-edit')
        let text_order = document.getElementById('text-edit-oreder')

        n_order.innerHTML = 'Orden Nº ' + oreder_to_edit[0].childNodes[0].innerHTML
        user.innerHTML = 'Cliente: ' + oreder_to_edit[4].innerHTML
        text_order.value = oreder_to_edit[5].innerHTML

        let atributes = oreder_to_edit[1].attributes

        for (let index = 0; index < atributes.length; index++) {
            const element = atributes[index];
            if (element.name.startsWith('menu-')) {

                praice_menu.push(element)
                let id_add = element.name.split('-')[1]

                for (let index = 0; index < tbody_order_edit.length; index++) {
                    const btn_add = tbody_order_edit[index].cells[4].childNodes[0];
                    const id = tbody_order_edit[index].id.split('_')[2]

                    if (id == id_add) {

                        btn_add.click()
                    }
                }
            }
        }

        let ditails = oreder_to_edit[1].getElementsByTagName('span')
            //ditails.pop()

        let ditails_aux = []

        for (let index = 0; index < ditails.length; index++) {
            const title = ditails[index];
            ditails_aux.push(title)
        }
        ditails_aux.pop()

        // ditails_aux = ditails_aux.reverse()

        console.log(praice_menu.length + '::' + tbody_order_edit_2_rows.length + '::' + ditails_aux.length)
        if (praice_menu.length == tbody_order_edit_2_rows.length && tbody_order_edit_2_rows.length == ditails_aux.length) {
            for (let index = 0; index < tbody_order_edit_2_rows.length; index++) {

                const details = ditails_aux[index]
                const tr = tbody_order_edit_2_rows[index];
                console.log(details)
                if (details.innerHTML.search("<h4") != -1) {
                    let h4_ele = details.getElementsByTagName('h4')
                    let current_detail = h4_ele[0].innerHTML
                    tr.cells[3].innerHTML = current_detail
                }



                const price = praice_menu[index].value
                total_calc += parseInt(price)
                tr.cells[2].innerHTML = '$' + price
            }
        }

        total.innerHTML = '$' + total_calc

        document.getElementById("modal_edit-order").style.display = 'block';
    } else {
        alert('seleccione un pedido para editarlo')
    }


}

function AddNewOreder() {

    let orders_id = []
    let table_oreders = document.getElementById('tbody-order')
    let total_price = document.getElementById('oreder-td-price')
    let cli_lbl = document.getElementById('client-label-new-oreder')
    let text_area = document.getElementById('text-new-oreder')
    let payment_method = document.getElementById('dorp-forma-de-pago').value
    let orders = table_oreders.rows
    let id_client = Clients.selected_to_new_order

    for (let index = 0; index < orders.length; index++) {
        const tr = orders[index];
        let temp_id_arr = tr.id.split('_')
        let id_temp = temp_id_arr[temp_id_arr.length - 2]

        let precio = 0
        let details = ''

        if ((tr.cells[2].childNodes.length == 0) || tr.cells[2].childNodes[0].nodeType == 3)
            precio = parseFloat(tr.cells[2].innerHTML.substring(1, tr.cells[2].innerHTML.length))
        else {
            let inp_exist = document.getElementById('edit-price')
            precio = parseFloat(inp_exist.value)
        }

        if ((tr.cells[3].childNodes.length == 0) || tr.cells[3].childNodes[0].nodeType == 3)
            details = tr.cells[3].innerHTML
        else {
            let inp_exist_des = document.getElementById('edit-description')
            details = inp_exist_des.value
        }


        let order_data = {
            precio,
            _id_menu: id_temp,
            details
        }

        orders_id.push(order_data)
    }

    if (orders_id.length > 0 && id_pizzeria != '' && typeof id_client != 'undefined') {
        let order = {
            id_cliente: id_client,
            id_Pizzeria: id_pizzeria,
            ids_menu: orders_id,
            details: text_area.value,
            payment_method
        }


        console.log(order.ids_menu)

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

                if (data) {
                    alert(data.msg)
                    document.getElementById('close_modal_new-order').click()
                    table_oreders.innerHTML = ''
                    total_price.innerHTML = '$0'
                    cli_lbl.innerHTML = 'Cliente:'
                    Clients.selected_to_new_order = undefined
                        //location.reload();
                }

            }).catch((error) => {
                console.log(error);
            })

    } else if (typeof id_client == 'undefined') {
        alert('no se ha cargado el cliente')
    } else if (orders_id.length <= 0) {
        alert('no se ha cargado el menu')
    } else if (id_pizzeria != '' == '') {
        alert('no se ha cargado el local')
    }
}

function openCity(evt, cityName, ele) {
    var i, tabcontent, tablinks;

    console.log(ele.id)

    localStorage.setItem('open-acordion', ele.id)

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}


function ModalMenu() {
    document.getElementById("modal_menu").style.display = 'block';
}

function ModaDelivery() {
    document.getElementById("modal_delivery").style.display = 'block';
}

function ModalCategoria() {
    document.getElementById("modal_categoria").style.display = 'block';
}

function ModalAddClientToOrder() {
    document.getElementById("modal_client-new-order").style.display = 'block';
}

//estoy aca
function CreateDeliveryRow(_id, name, last_name, matricula, vehiculo) {

    let tr = document.createElement('tr')
    let td_name = CreateColum(name)
    let td_last_name = CreateColum(last_name)
    let td_matricula = CreateColum(matricula)
    let td_vehiculo = CreateColum(vehiculo)

    tr.appendChild(td_name)
    tr.appendChild(td_last_name)
    tr.appendChild(td_matricula)
    tr.appendChild(td_vehiculo)

    tr.id = _id

    return tr
}

function Action() {
    console.log('hola')
}


function CreatePedidosRow(_id, n_order, date, huors, cliente, pedido, detalles, direecion, telefono, delivery, state, total, menus, details_menu, pago) {

    let n_order_strig = ''
    let stat_text = 'Recibido'


    // received


    if (n_order < 10)
        n_order_strig = '0' + n_order.toString()
    else
        n_order_strig = n_order.toString()

    let div_action = document.createElement('div')
    div_action.innerHTML = n_order_strig

    //div_action.addEventListener('click', Action())

    if (state == 'process') {
        stat_text = 'En Proceso'
    }

    if (state == 'in coming') {
        stat_text = 'En Reparto'
    }


    if (state == 'delivered') {
        stat_text = 'Entregado'
    }


    if (state == 'cancel') {
        stat_text = 'Cancelado'
    }

    let content_state_order = document.createElement('div')

    content_state_order.style.color = '#FDFEFE'
    content_state_order.style.fontWeight = '900'
    content_state_order.style.backgroundColor = '#D443E6'
    content_state_order.style.borderRadius = '10px'
    content_state_order.style.padding = '10px'

    if (state == 'process') {
        content_state_order.style.backgroundColor = '#E67E22'
    }

    if (state == 'in coming') {
        content_state_order.style.backgroundColor = '#3498DB'
    }


    if (state == 'delivered') {
        content_state_order.style.backgroundColor = '#27AE60'
    }


    if (state == 'cancel') {
        content_state_order.style.backgroundColor = '#E74C3C'
    }

    content_state_order.innerHTML = stat_text

    let text_pedido_arr = pedido.split(',')
    let text_pedido = ''

    for (let index = 0; index < text_pedido_arr.length; index++) {
        const pedido = text_pedido_arr[index];
        if (!pedido.endsWith('</h4>'))
            text_pedido += '<span>' + pedido + '<br>' + '</span>'
        else
            text_pedido += '<span>' + pedido + '</span>'
    }
    text_pedido = text_pedido.substring(0, text_pedido.length - 11)


    let content_pedido = document.createElement('div')
    content_pedido.classList.add('comprimir')
    content_pedido.addEventListener("click", () => { content_pedido.classList.toggle('expand') })
    content_pedido.innerHTML = text_pedido

    let tr = document.createElement('tr')
    let td_n_order = CreateColum(div_action, false, true)
    let td_pedido = CreateColum(content_pedido, false, true)
    let td_date = CreateColum(date)
    let td_huors = CreateColum(huors)
    let td_cliente = CreateColum(cliente)
    let td_detalles = CreateColum(detalles)
    let td_direecion = CreateColum(direecion)
    let td_telefono = CreateColum(telefono)
    let td_delivery = CreateColum(delivery)
    let td_pago = CreateColum(pago)
    let td_state = CreateColum(content_state_order, false, true)
    let td_total = CreateColum('$ ' + total)

    if (state == 'cancel')
        td_total.style.textDecoration = 'line-through'



    if (menus.length > 0) {
        for (let index = 0; index < menus.length; index++) {
            const menu = menus[index];
            const det_menu = details_menu[index]
            let current_price = 0

            current_price = det_menu.precio
            const id = 'menu-' + menu.menu._id + '-' + index
            td_pedido.setAttribute(id, current_price)
        }

    }

    td_pedido.colSpan = 4
    td_pedido.style.fontWeight = "900"
    td_pedido.style.fontSize = "1.2rem"
    td_pedido.style.textAlign = "left"


    tr.appendChild(td_n_order)
    tr.appendChild(td_pedido)
    tr.appendChild(td_date)
    tr.appendChild(td_huors)
    tr.appendChild(td_cliente)
    tr.appendChild(td_detalles)
    tr.appendChild(td_direecion)
    tr.appendChild(td_telefono)
    tr.appendChild(td_delivery)
    tr.appendChild(td_pago)
    tr.appendChild(td_state)
    tr.appendChild(td_total)
    tr.style.cursor = 'pointer'
    tr.id = _id


    if (typeof temp.select_oreder != 'undefined') {
        let id_selected = temp.select_oreder.id
        if (tr.id == id_selected) {
            tr.style.backgroundColor = '#ddd'
            tr.style.border = '2px solid rgb(27, 154, 212)'
        }

    }



    tr.setAttribute('onclick', 'Select(event,this,"tbody-pedidos")')

    return tr
}



function ModaDeliveryOreder() {
    if (temp.select_oreder) {

        document.getElementById("modal_delivery_oreder").style.display = 'block';
    } else
        alert('seleccione un pedido para agregarle un delivery')

}

function AddDelivery() {
    if (temp.select_oreder) {

        let _id_delivery = document.getElementById('drop_del_pedidos').value
        let _id = temp.select_oreder.id
        let send_data = { _id, _id_delivery }

        fetch('/pedido/adddelivery', {
                method: 'POST',
                body: JSON.stringify(send_data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {


                alert(data.msg)

            }).catch((error) => {
                console.log(error);
            })



    } else {
        console.log('no hay orden seleccionada')
    }
}

function CreateEditOrderRow(_id, categoria, titulo, precio, disponibilidad) {
    let tr = document.createElement('tr')

    tr.style.cursor = 'pointer'
    tr.id = _id


    let button_add_menu = document.createElement('button')
    button_add_menu.type = 'submit'
    button_add_menu.innerHTML = '>>'
    button_add_menu.setAttribute("onclick", `AddMenuToOrderEdit(${tr.id})`)

    let disponibilidad_text = disponibilidad ? 'si' : 'no'

    let td_categoria = CreateColum(categoria)
    let td_titulo = CreateColum(titulo)
    let td_precio = CreateColum('$' + precio)
    let td_disponibilidad = CreateColum(disponibilidad_text)
    let td_btn_add = document.createElement('td')

    td_btn_add.appendChild(button_add_menu)

    tr.appendChild(td_categoria)
    tr.appendChild(td_titulo)
    tr.appendChild(td_precio)
    tr.appendChild(td_disponibilidad)
    tr.appendChild(td_btn_add)

    return tr

}


function AddMenuToOrderEdit(menu) {

    let t = document.getElementById('tbody-oreder-edit-2')

    let total = document.getElementById('oreder-edit-td-price')
    let total_price = parseFloat(total.innerHTML.substring(1))

    let c = menu.cells[0].innerHTML
    let ti = menu.cells[1].innerHTML
    let pre = menu.cells[2].innerHTML
    let dis = ''

    let row = t.insertRow(0)
    row.id = 'add_menu_edit_' + menu.id + '_' + t.rows.length
    let cat = row.insertCell(0)
    let title = row.insertCell(1)
    let precio = row.insertCell(2)
    let dispon = row.insertCell(3)
    let delet = row.insertCell(4)
    dispon.id = 'description'


    let price_row = parseFloat(pre.substring(1))

    let btn_delete = document.createElement('button')
    btn_delete.type = 'submit'
    btn_delete.innerHTML = 'X'
    btn_delete.setAttribute("onclick", `DeleteMenuToOrderEdit(${row.id})`)


    delet.appendChild(btn_delete)

    cat.innerHTML = c
    title.innerHTML = ti
    precio.innerHTML = pre
    dispon.innerHTML = dis

    total_price += price_row

    total.innerHTML = '$' + total_price

}

function DeleteMenuToOrderEdit(row) {
    let id = ''
    let price_to_delete = 0
    if (row.length == undefined) {
        id = row.id
        price_to_delete = parseFloat(row.cells[2].innerHTML.substring(1, row.cells[2].innerHTML.length))
        console.log(price_to_delete)
    } else if (row.length > 0) {
        id = row[0].id
        price_to_delete = parseFloat(row[0].cells[2].innerHTML.substring(1, row[0].cells[2].innerHTML.length))
    }



    let total = document.getElementById('oreder-edit-td-price')

    let total_price = parseFloat(total.innerHTML.substring(1))

    total_price -= price_to_delete

    total.innerHTML = '$' + total_price


    let t = document.getElementById('tbody-oreder-edit-2')

    t.deleteRow(row.rowIndex);
}

function CreateNewOrderRow(_id, categoria, titulo, precio, disponibilidad) {
    let tr = document.createElement('tr')

    tr.style.cursor = 'pointer'
    tr.id = 'menu_order_' + _id

    let button_add_menu = document.createElement('button')
    button_add_menu.type = 'submit'
    button_add_menu.innerHTML = '>>'
    button_add_menu.setAttribute("onclick", `AddMenuToOrder(${tr.id})`)

    let disponibilidad_text = disponibilidad ? 'si' : 'no'

    let td_categoria = CreateColum(categoria)
    let td_titulo = CreateColum(titulo)
    let td_precio = CreateColum('$' + precio)
    let td_disponibilidad = CreateColum(disponibilidad_text)
    let td_btn_add = document.createElement('td')

    td_btn_add.appendChild(button_add_menu)

    tr.appendChild(td_categoria)
    tr.appendChild(td_titulo)
    tr.appendChild(td_precio)
    tr.appendChild(td_disponibilidad)
    tr.appendChild(td_btn_add)

    return tr
}

function AddMenuToOrder(menu) {

    let t = document.getElementById('tbody-order')
    let total = document.getElementById('oreder-td-price')
    let total_price = parseFloat(total.innerHTML.substring(1))

    let c = menu.cells[0].innerHTML
    let ti = menu.cells[1].innerHTML
    let pre = menu.cells[2].innerHTML
    let dis = ''

    let row = t.insertRow(0)

    row.id = 'add_menu_' + menu.id + '_' + t.rows.length
    let cat = row.insertCell(0)
    let title = row.insertCell(1)
    let precio = row.insertCell(2)
    let dispon = row.insertCell(3)
    let delet = row.insertCell(4)
    dispon.id = 'description'


    let price_row = parseFloat(pre.substring(1))

    let btn_delete = document.createElement('button')
    btn_delete.type = 'submit'
    btn_delete.innerHTML = 'X'
    btn_delete.setAttribute("onclick", `DeleteMenuToOrder(${row.id})`)

    delet.appendChild(btn_delete)

    cat.innerHTML = c
    title.innerHTML = ti
    precio.innerHTML = pre
    dispon.innerHTML = dis

    total_price += price_row

    total.innerHTML = '$' + total_price

}

function DeleteMenuToOrder(row) {

    let id = ''
    let price_to_delete = 0
    if (row.length == undefined) {
        id = row.id
        price_to_delete = parseFloat(row.cells[2].innerHTML.substring(1, row.cells[2].innerHTML.length))
        console.log(price_to_delete)
    } else if (row.length > 0) {
        id = row[0].id
        price_to_delete = parseFloat(row[0].cells[2].innerHTML.substring(1, row[0].cells[2].innerHTML.length))
    }

    let t = document.getElementById('table_oreder')
    let total = document.getElementById('oreder-td-price')

    let total_price = parseFloat(total.innerHTML.substring(1))

    total_price -= price_to_delete
    total.innerHTML = '$' + total_price

    t.deleteRow(row.rowIndex);
}



function CreateMenuRow(_id, categoria, titulo, descripcion, precio, disponibilidad, img, portada) {

    let tr = document.createElement('tr')

    if (portada) {
        tr.style.backgroundColor = 'rgb(27, 154, 212)'
        tr.setAttribute("portada", true)
    } else
        tr.setAttribute("portada", false)

    tr.id = _id
    tr.style.cursor = 'pointer'
    let disponibilidad_text = disponibilidad ? 'si' : 'no'
    let td_categoria = CreateColum(categoria)
    let td_titulo = CreateColum(titulo)
    let td_descripcion = CreateColum(descripcion)
    let td_precio = CreateColum('$' + precio)
    let td_disponibilidad = CreateColum(disponibilidad_text)
    let td_img = CreateColum(img, true)

    let btn_edit = document.createElement('button')
    btn_edit.innerHTML = 'aplicar'
    btn_edit.setAttribute('onclick', `SetPortada("${_id}")`)

    td_btn_edit = CreateColum(btn_edit, false, true)

    tr.appendChild(td_categoria)
    tr.appendChild(td_titulo)
    tr.appendChild(td_descripcion)
    tr.appendChild(td_precio)
    tr.appendChild(td_disponibilidad)
    tr.appendChild(td_img)
    tr.appendChild(td_btn_edit)

    tr.setAttribute('onclick', 'Select(event,this,"tbody-menu")')

    return tr

}




function OrderConfirm() {
    if (temp.select_oreder) {



        let _id = temp.select_oreder.id

        fetch('/pedido/orderconfirm', {
                method: 'POST',
                body: JSON.stringify({ _id }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                alert(data.msg)
            }).catch((error) => {
                console.log(error);
            })
    } else
        alert('seleccione un pedido para confirmarlo')
}

function CreatePizzeria(user_id) {

    let user_data = {
        email: '',
        name: 'nostra pizza',
        address: 'Avenida Pablo Rios N47',
        phone: '091899084',
        user_id
    }

    fetch('/pizzeria/create', {
            method: 'POST',
            body: JSON.stringify(user_data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            localStorage.setItem('_id_pizzeria', data.pizz._id)
            localStorage.setItem('categorias', JSON.stringify(data.pizz.menus))
            SetHoursAndDays(data.pizz.hours_days)

            GetPedidos(data.pizz._id)

            setInterval(() => {
                GetPedidos(data.pizz._id)
            }, 10000);

            pizz = data.pizz
            ShowMenusLists(pizz)

        }).catch((error) => {
            console.log(error);
        })

}

function GetPedidos(id) {
    fetch('/pedido/pizzeria/' + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {

            if (data.oreders !== undefined)
                ShowPedidos(data)

        }).catch((error) => {
            console.log(error);
        })

}

function ShowPedidos(data) {

    let oreders_total = 0
    let oreders_general_total = 0
    let tbody_pedidos = document.getElementById('tbody-pedidos')
    let drop_del_deliverys_search = document.getElementById('drop_del_deliverys_search').value

    tbody_pedidos.innerHTML = ''

    data.oreders.forEach(oreder => {
        let count = 1
        let total = 0
        let pedido = []
        let pedido_titulo = ''
        let payment_method = oreder.payment_method

        if (oreder.menu.length == 1) {
            const current_order = oreder.menu[0];
            const det_menu = oreder.details_menu[0]

            let menu_details = det_menu.details

            if (menu_details != '')
                menu_details = "<h4 style='margin:0; padding:0;'>" + menu_details + '</h4>'

            const current_order_cat = oreder.menu[0].categoria;
            pedido.push({ titulo: current_order_cat + " " + current_order.menu.titulo + menu_details, count: 1 })
            total += det_menu.precio

        } else {

            oreder.menu.sort((a, b) => a.menu._id - b.menu._id)



            for (let index = 0; index < oreder.menu.length; index++) {
                const det_menu = oreder.details_menu[index]
                total += det_menu.precio
            }
            console.log('--------------------------------')
                // hacer de nuevo

            let current_details_array = []

            // let current_details_array = oreder.details_menu

            for (let index = oreder.details_menu.length - 1; index >= 0; index--) {


                const index_invert = (oreder.details_menu.length - 1) - index

                current_details_array[index_invert] = oreder.details_menu[index]


                console.log('index_invert', index_invert)
                console.log('index', index)

                console.log(oreder.details_menu[index])
                console.log(current_details_array[index])
            }


            console.log('current_details_array', current_details_array)

            for (let index = 0; index < oreder.menu.length; index++) {

                const current_order = oreder.menu[index];

                const current_order_cat = oreder.menu[index].categoria;

                let current_details = current_details_array[index].details

                if (current_details != '')
                    current_details = "<h4 style='margin:0; padding:0;'>" + current_details + '</h4>'

                pedido.push({ titulo: current_order_cat + " " + current_order.menu.titulo + current_details })

            }
        }

        let client = oreder.client.first_name + ' ' + oreder.client.last_name
        let address_client = oreder.client.address
        let phone_client = oreder.client.phone

        oreders_general_total += total

        let delivery = oreder.delivery

        if (oreder.delivery == undefined)
            delivery = 'sin delivery'
        else
            delivery = oreder.delivery._name + ' ' + oreder.delivery.last_name

        let pedido_descripcion = oreder.details

        pedido.forEach(p => {
            pedido_titulo += p.titulo + ', '
        })

        let update_Date = new Date(oreder.date).toLocaleString();


        let fecha = update_Date.split(' ')


        let date_string_american = fecha[0].split('/')
        let date_string = date_string_american[2] + '/' + date_string_american[1] + '/' + date_string_american[0]

        let hours_string_arr = fecha[1].split(':')
        let hours_string = hours_string_arr[0] + ':' + hours_string_arr[1]

        console.log(oreder)

        let row = CreatePedidosRow(oreder._id, oreder.n_order, date_string, hours_string, client, pedido_titulo, pedido_descripcion, address_client, phone_client, delivery, oreder.state, total, oreder.menu, oreder.details_menu, payment_method)

        if (delivery == drop_del_deliverys_search || drop_del_deliverys_search == 'ALL') {
            row.style.display = ''
            if (oreder.state != 'cancel')
                oreders_total += total
        } else
            row.style.display = 'none'

        tbody_pedidos.appendChild(row)

        pedido_titulo = ''
    })

    let porcentaje = oreders_total * 100 / oreders_general_total

    tfoot_oreder_Total = document.getElementById('total-oreders-price')
    tfoot_oreder_general_total = document.getElementById('oreders_general_total')
    tfoot_oreder_porcentaje = document.getElementById('oreders_porcentage')
    tfoot_oreder_porcentaje.innerHTML = '%' + porcentaje.toFixed(2);
    tfoot_oreder_general_total.innerHTML = ' $' + oreders_general_total
    tfoot_oreder_Total.innerHTML = '$' + oreders_total

}

function CancelOrder() {
    if (temp.select_oreder) {



        let _id = temp.select_oreder.id

        let conf = confirm('¿Esta seguro de cancelar el pedido?')

        if (conf) {
            fetch('/pedido/cancel', {
                    method: 'POST',
                    body: JSON.stringify({ _id }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    alert(data.msg)
                }).catch((error) => {
                    console.log(error);
                })
        }
    } else
        alert('seleccione un pedido para cancelarlo')
}


function CreateCategoria() {

    let categoria = document.getElementById('inputfiled_categoria').value
    if (categoria) {
        let _id_pizzeria = id_pizzeria
        let user_data = {
            _id_pizzeria,
            categoria
        }

        fetch('/pizzeria/addcategoria', {
                method: 'POST',
                body: JSON.stringify(user_data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {



                let drop = document.getElementById('drop_cat_menu')
                let op = document.createElement('option')
                op.text = data.categoria
                drop.add(op)

                let drop_edit = document.getElementById('drop_cat_edit')
                let op_edit = document.createElement('option')
                op_edit.text = data.categoria
                drop_edit.add(op)
                document.getElementById('close_modal_categoria').click()
                alert(`La categoria ${data.categoria} fue creada correctamente`)

            }).catch((error) => {
                console.log(error);
            })
    }

}

function CreateDelivery() {

    let name_input = document.getElementById('inputfiled_delivery_nombre')
    let last_name_input = document.getElementById('inputfiled_delivery_apellido')
    let matricula_input = document.getElementById('inputfiled_delivery_matricula')
    let vehiculo_input = document.getElementById('inputfiled_delivery_vehiculo')

    let name = name_input.value
    let last_name = last_name_input.value
    let matricula = matricula_input.value
    let vehiculo = vehiculo_input.value


    if (
        name &&
        last_name &&
        matricula &&
        vehiculo
    ) {
        fetch('/delivery/create', {
                method: 'POST',
                body: JSON.stringify({ name, last_name, matricula, vehiculo }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {

                if (data)
                    GetALllDeliverys()

            }).catch((error) => {
                console.log(error);
            })
    }

    // name_input.required  
    // last_name_input.required  
    // matricula_input.required  
    // vehiculo_input.required

    /* 


*/
}

function GetALllDeliverys() {

    fetch('/delivery', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {

            if (data) {
                let tbody = document.getElementById('tbody-deliverys')
                let search_deliverys_oreder = document.getElementById('dropdown-delivery-search')
                let pedidos = document.getElementById('Pedidos')
                tbody.innerHTML = ''

                let modal_delivery_oreder = new Modal('delivery_oreder')

                let drop_delivery = new DropDown('drop_del_pedidos')
                let drop_delivery_search = new DropDown('drop_del_deliverys_search')
                drop_delivery_search.setClass('mr-1p')

                let button_delivery_oreder = document.createElement('button')
                button_delivery_oreder.type = 'submit'
                button_delivery_oreder.innerHTML = 'Agregar Delivery'
                button_delivery_oreder.setAttribute("onclick", "AddDelivery()")

                let button_delivery_search = document.createElement('button')
                button_delivery_search.type = 'submit'
                button_delivery_search.innerHTML = 'Buscar'

                button_delivery_search.setAttribute("onclick", "SearchDelivery()")

                drop_delivery_search.addOption('Todos los pedidos', 'ALL')
                drop_delivery_search.addOption('Sin delivery', 'sin delivery')

                data.deliverys.forEach(del => {
                    tbody.appendChild(CreateDeliveryRow(del._id, del._name, del.last_name, del.matricula, del.vehiculo))
                    drop_delivery.addOption(del._name + ' ' + del.last_name, del._id)
                    drop_delivery_search.addOption(del._name + ' ' + del.last_name, del._name + ' ' + del.last_name)
                })

                modal_delivery_oreder.setModalContent(drop_delivery.getDrop())
                modal_delivery_oreder.setModalContent(button_delivery_oreder)

                search_deliverys_oreder.appendChild(drop_delivery_search.getDrop())
                search_deliverys_oreder.appendChild(button_delivery_search)

                pedidos.appendChild(modal_delivery_oreder.getModal())

            }

        }).catch((error) => {
            console.log(error);
        })
}

function SearchDelivery() {


    let tpedidos = document.getElementById('tbody-pedidos').rows
    let delivery = document.getElementById('drop_del_deliverys_search').value
    let total_oreders_price = document.getElementById('total-oreders-price')
    console.log(delivery)

    let total = 0

    for (let index = 0; index < tpedidos.length; index++) {
        const row = tpedidos[index];
        search = row.cells[8].innerHTML

        if (search == delivery || delivery == 'ALL') {
            row.style.display = ''
            let total_oreder = parseFloat(row.cells[10].innerHTML.substring(1))
            total += total_oreder
        } else {
            row.style.display = 'none'
        }

    }
    total_oreders_price.innerHTML = '$' + total

}

function See(e) {

    //'btn-create-order'
    //'btn-edit-order'

    let t = e.target
    let target_id = t.parentElement.parentElement.id

    let data = t.innerHTML
    let first_char = data.substring(0, 1)

    let inp_exist = document.getElementById('edit-price')
    let inp_exist_des = document.getElementById('edit-description')

    if (inp_exist_des) {
        let parent = inp_exist_des.parentElement
        parent.setAttribute('new-description', inp_exist_des.value)
        parent.innerHTML = inp_exist_des.value


        inp_exist_des.remove();

    } else if ((target_id == 'tbody-order') || (target_id == 'tbody-oreder-edit-2')) {

        if (t.id == 'description') {
            let inp = document.createElement('input')
            inp.type = 'text'
            inp.style.padding = '1em'
            inp.style.width = '5em'
            inp.id = 'edit-description'
            inp.value = t.innerHTML
            t.innerHTML = ''
            t.appendChild(inp)
            inp.focus()
        }
    }
    if (inp_exist) {
        let parent = inp_exist.parentElement

        parent.setAttribute('new-price', inp_exist.value)
        parent.innerHTML = '$' + inp_exist.value

        let id_table = parent.parentElement.parentElement.id

        current_table = document.getElementById(id_table)
        let precio_total = 0



        for (let index = 0; index < current_table.rows.length; index++) {
            const row = current_table.rows[index];
            let c_price = parseFloat(row.cells[2].innerHTML.substring(1, row.cells[2].innerHTML.length))
            precio_total += c_price
        }

        if (id_table == 'tbody-order') {
            document.getElementById('oreder-td-price').innerHTML = '$' + precio_total
        }

        if (id_table == 'tbody-oreder-edit-2') {
            document.getElementById('oreder-edit-td-price').innerHTML = '$' + precio_total
        }



        inp_exist.remove();

    } else if ((target_id == 'tbody-order' || target_id == 'tbody-oreder-edit-2')) {

        if (first_char == "$") {
            let inp = document.createElement('input')
            inp.type = 'number'
            inp.style.padding = '1em'
            inp.style.width = '5em'
            inp.id = 'edit-price'
            inp.value = data.substring(1, data.length)
            t.innerHTML = ''
            t.appendChild(inp)
            inp.focus()
        }

    }







    if (t.tagName != 'TD') {
        hideOptions('options')
        hideOptions('options-menus')
        hideOptions('options-client')
    }


}