function GetPizzerias(){

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

            console.log(data)

            data_temp.open = data.hours_data.open 

            let hours_day = data.pizz[0].hours_days
            let days = hours_day.days
            let hours = hours_day.hours

            let day_text_ele = document.getElementById('days')
            let hours_text_ele = document.getElementById('hours')

            let hours_text = ''
            
            //let day_text =

            // a definir texto del horario

            if(hours.morning.close==hours.late.open)            
                hours_text = 'abre:'+hours.morning.open +' cierra:' +hours.late.close
            else            
                hours_text = 'abre:'+hours.morning.open +' cierra:' +hours.morning.close +'  /  abre:'+hours.late.open +'  cierra:' +hours.late.close
            

            hours_text_ele.innerHTML = hours_text
            day_text_ele.innerHTML = data.hours_data.text_days

            let categoria = data.pizz[0].menus
            data_temp.pizzId = data.pizz[0]._id    
            data_temp.categoria = categoria    
            CerateMainMenu(data.hours_data.open)    

        }).catch((error) => {
            console.log(error);
        })

}



window.addEventListener('load',function(event){
    GetPizzerias()

    setInterval(() => {
        fetch('/pizzeria/updatepizzeriastate', {
            method: 'POST',
            body: JSON.stringify({open: data_temp.open}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {

            if(Array.isArray(data.pizz))
            {
                let hours_day = data.pizz[0].hours_days
                let days = hours_day.days
                let hours = hours_day.hours

                let day_text_ele = $GetElement('days')
                let hours_text_ele = $GetElement('hours')
    
                let hours_text = ''

                if(hours.morning.close==hours.late.open)            
                hours_text = 'abre:'+hours.morning.open +' cierra:' +hours.late.close
                else            
                hours_text = 'abre:'+hours.morning.open +' cierra:' +hours.morning.close +'  /  abre:'+hours.late.open +'  cierra:' +hours.late.close

                hours_text_ele.innerHTML = hours_text
                day_text_ele.innerHTML = data.hours_data.text_days

                data_temp.open = data.hours_data.open 

                    data_temp.categoria = data.pizz[0].menus

                    
                    CerateMainMenu(data_temp.open)
                
            }

            let open_lbl = $GetElement('open-lbl')
            if(data_temp.open)
            open_lbl.innerHTML = 'Abierto'
            else
            open_lbl.innerHTML = 'Cerrado'

        }).catch((error) => {
            console.log(error);
        })

    }, 1000);

})




function openAcordion(acordion) {
    acordion.classList.toggle("active");
    let panel = acordion.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
}

function addorder(oreder) {
    let see = oreder.classList.toggle("order")
    let id = oreder.id.split('_')
    let new_id = id[1] +'?'+ id[2]
    if (see) {


        let menu = oreder.getElementsByTagName("div")[1].innerHTML.split('<')
        let menu_title = menu[2].split('>')[1]
        let menu_price = parseInt(menu[4].split('>')[1].substring(1))
        let tbody = document.getElementById('ord')
        let reslut = new ListPedido(new_id, 1, menu_title, menu_price)

        data_temp.precio.push({
            price: menu_price,
            id_pedido: new_id,
            id_menu: oreder.id
        })
        data_temp.total += menu_price


        tbody.innerHTML += reslut.get_pedido()

        updateTotal()
    }
    else {
        let menu = document.getElementById('menu_' + new_id)
        let price = parseInt(menu.getElementsByTagName('div')[3].innerHTML.substring(1))
        data_temp.total -= price
        updateTotal()
        menu.remove()
    }

}


