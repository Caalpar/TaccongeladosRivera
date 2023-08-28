let my_orders = $GetElement('my-orders')
let my_history = $GetElement('my-orders-history')


function ShowMyOrders(order) {


    if (order == 'history') {
        my_orders.style.display = 'none'
        my_history.style.display = 'block'
    }

    if (order == 'orders') {
        my_orders.style.display = 'block'
        my_history.style.display = 'none'
    }
}


function CreateMyOrders(_id, date, title, state, delivery, price, order) {

    let html = `
    <div id='${_id}'>
    <span style="width:90%;text-align: left; padding:0.6em 5%; height: 100%;"><p style="font-size: 1.2rem;font-weight: 900;">${title}</p></span>
    <span style="width:37%;">${date}</span>
    <span>${state}</span>
    <span>${delivery}</span>
    <span>${price}</span>
    <hr class="hr-my-orders">
    </div>`

    if (order == 'delivered')
        my_history.innerHTML += html

    if (order == 'process' || order == 'in coming')
        my_orders.innerHTML += html
}


function UpdateMyOrders(id) {
    fetch('/pedido/' + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {

            let state = $GetElementsByTagName($GetElement(data.pedido._id), 'span')[2]

            let state_text = 'sin delivery'


            if (data.delivery) {

                state_text = 'En camino'

                let delivery = $GetElementsByTagName($GetElement(data.pedido._id), 'span')[3]



                if (delivery.innerHTML == 'sin delivery')
                    SnackBar('Tu pedido va en camino')

                let name = data.delivery._name + ' ' + data.delivery.last_name

                if (data.pedido.state == "delivered")
                    state_text = "Entregado"

                delivery.innerHTML = name
            }


            if (data.pedido.state == "cancel")
                state_text = "Cancelado"

            state.innerHTML = state_text

        }).catch((error) => {
            console.log(error);
        })
}

window.addEventListener('load', function(event) {
    let index = 0
    let index_history = 0

    setInterval(() => {


        let my_table_orders = $GetElementsByTagName(my_orders, 'div')
        let my_table_orders_history = $GetElementsByTagName(my_history, 'div')

        if (my_table_orders.length > 0) {
            UpdateMyOrders(my_table_orders[index].id)

            index++

            if (index == my_table_orders.length)
                index = 0
        }

        if (my_table_orders_history.length > 0) {

            UpdateMyOrders(my_table_orders_history[index_history].id)

            index_history++
            if (index_history == my_table_orders_history.length)
                index_history = 0

        }

    }, 1000);
})