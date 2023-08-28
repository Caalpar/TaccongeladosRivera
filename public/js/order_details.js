function DetailsElem() {

    if (temp.select_oreder) {


        let oreder_to_print = document.getElementById(temp.select_oreder.id).getElementsByTagName('td')

        let individual_price = []

        for (let index = 0; index < oreder_to_print[1].attributes.length; index++) {
            const m = oreder_to_print[1].attributes[index];


            if (m.name.startsWith('menu-')) {
                individual_price.push(m.value)
            }
        }


        let oreder_text_arr = oreder_to_print[1].innerHTML.split('</span>')

        oreder_text_arr.pop()
        oreder_text_arr.pop()

        console.log(oreder_to_print[8])

        let oreder_text = ''



        let text_order_arry = []

        for (let index = 0; index < oreder_text_arr.length; index++) {
            if (index < individual_price.length) {
                const order = oreder_text_arr[index]
                let search_details = order.search("<h4")

                if (search_details == -1) {

                    let title_ini = order.substring(0, order.length - 4)
                    oreder_text += title_ini + ' --- $' + individual_price[index] + '<br>'

                } else {

                    let title_ini = order.substring(0, search_details - 1)
                    title_ini += ' --- $' + individual_price[index];

                    let title_fin = order.substring(search_details, order.length)
                    oreder_text += title_ini + title_fin

                }

            }

        }

        console.log(text_order_arry)




        let text = `
        <div style="float:left;">Fecha: ${oreder_to_print[2].innerHTML}</div>
        <div style="float:right;">Hora: ${oreder_to_print[3].innerHTML}</div>   
        <div style=" font-size: 1.3em; text-align: center; margin-top:50px;">Nº:${oreder_to_print[0].childNodes[0].innerHTML}</div>
        <div><hr/></div>
        <div style=" font-size: 1.3em;">Pedido</div>
        <div>${oreder_text}</div>
        <div><hr/></div>
        <div>Tipo de pago: ${oreder_to_print[9].innerHTML}</div>
        <div><hr/></div>
        <div>Delivery: ${oreder_to_print[8].innerHTML}</div>
        <div><hr/></div>
        <div>Observación: ${oreder_to_print[5].innerHTML}</div>
        <div><hr/></div>
        <div>Cliente: ${oreder_to_print[4].innerHTML}</div>
        <div>Dirección: ${oreder_to_print[6].innerHTML}</div>
        <div>Teléfono: ${oreder_to_print[7].innerHTML}</div>
        <div><hr/></div>
        <div style=" font-size: 1.3em; text-align: center;">Importe: ${oreder_to_print[oreder_to_print.length-1].innerHTML}</div>`

        let a = window.open('', '', 'height=500, width=500');
        a.document.write('<html>');
        a.document.write(`<body><br>`);
        a.document.write(text);
        a.document.write('</body>');
        a.document.write('</html>');

    } else {
        console.log('seleccione un pedido para ver sus detalles')
    }
    //  var divContents = document.getElementById("GFG").innerHTML;



}

function OrderInProcess() {
    if (temp.select_oreder) {

        let _id = temp.select_oreder.id

        fetch('/pedido/orderinprocess', {
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