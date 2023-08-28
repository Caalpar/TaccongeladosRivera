function showoreders() {
    let show = document.getElementById("show-oreders")
    show.classList.toggle("show-oreder")
}


function remove_pedido(datos) {
    if (data_temp.precio.length > 0) {
        let data = datos.previousSibling.parentElement.previousSibling.parentElement.getElementsByTagName("div")

        let id = datos.previousSibling.parentElement.previousSibling.parentElement.id.split('_')[1]



        let index_price = data_temp.precio.findIndex(p => p.id_pedido === id)

        if (index_price !== -1) {
            let precio = data_temp.precio[index_price].price
            let countHTML = data[0].getElementsByTagName("span")[0]
            let priceHTML = data[3]

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



function add_pedido(datos) {
    if (data_temp.precio.length > 0) {
        let data = datos.previousSibling.parentElement.previousSibling.parentElement.getElementsByTagName("div")

        console.log(data)

        let id = datos.previousSibling.parentElement.previousSibling.parentElement.id.split('_')[1]

        let index_price = data_temp.precio.findIndex(p => p.id_pedido === id)


        if (index_price !== -1) {
            let precio = data_temp.precio[index_price].price

            let countHTML = data[0].getElementsByTagName("span")[0]
            let priceHTML = data[3]

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


function CreatePedido() {
    let data = $GetElement('ord').getElementsByTagName('article')

    let text_area = $GetElement('details')

    let new_oreder = []

    let payment_method = 'efectivo'

    for (let index = 0; index < data.length; index++) {
        const ped = data[index];

        let price = parseFloat(ped.childNodes[5].innerHTML.substring(1, ped.childNodes[5].innerHTML.length))

        let id = ped.id.split('_')[1].split('?')[0]
        let count = ped.getElementsByTagName('div')[0].getElementsByTagName('span')[0].innerHTML
        for (let index = 0; index < count; index++) {

            new_oreder.push({
                _id_menu: id,
                details: '',
                precio: price
            })
        }



    }


    if ((data_temp.clientId != null) && (data_temp.pizzId !== null) && (new_oreder.length > 0)) {


        let order = {
            id_cliente: data_temp.clientId,
            id_Pizzeria: data_temp.pizzId,
            ids_menu: new_oreder,
            details: text_area.value,
            payment_method
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


                if (data) {

                    on_overlay('Hemos cargado tu pedido, puedes ver su estado en <br>"Mis Pedidos"')

                    $GetElement('btn-show-list-order').click()
                    text_area.value = ''
                    let panels = document.getElementsByClassName('food')
                    $GetElement('ord').innerHTML = ''
                    data_temp.total = 0
                    updateTotal()

                    for (let index = 0; index < panels.length; index++) {

                        console.log(index)
                        let element = panels[index];
                        element.className = 'food'
                    }

                    let arr_orders = data.oreders.reverse();

                    arr_orders.forEach(o => {
                        let fecha = o.date.split(' ')

                        console.log(o.date)

                        let date_string_american = fecha[0].split('-')
                        let ano = date_string_american[2].substring(0, date_string_american[2].length - 1)
                        let date_string = ano + '/' + date_string_american[1] + '/' + date_string_american[0]

                        let hours_string_arr = fecha[1].split(':')
                        let hours_string = hours_string_arr[0] + ':' + hours_string_arr[1]
                        let date = date_string + ':' + hours_string

                        let state_text = 'En proceso'
                        if (o.state == 'delivered')
                            state_text = 'entregado'

                        if (o.state == 'cancel')
                            state_text = 'cancelado'

                        console.log(o.titulo)

                        CreateMyOrders(o._id, date, o.titulo, state_text, 'sin delivery', '$' + o.total, o.state)

                    })

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