let id = localStorage.getItem("_id")
let token = localStorage.getItem("token")
let id_pizzeria = localStorage.getItem("_id_pizzeria")
let pizz = null
let temp = {}

function CreateColum(data, img = false, object = false) {
    let td = document.createElement('td')
    if (img) {
        let imge = document.createElement('img')
        imge.src = '/imge/' + data
        imge.style.width = '100%'
        imge.style.height = 'auto'
        imge.style.maxWidth = '120px'
        td.appendChild(imge)
    } else if (object)
        td.appendChild(data)
    else
        td.innerHTML = data
    return td
}

function showOptions(x, y, id) {
    let options = document.getElementById(id)
    options.style.display = 'block'
    y += 350
    options.style.top = y.toString() + 'px'
    options.style.left = x.toString() + 'px'

}

function hideOptions(id) {
    let options = document.getElementById(id)
    options.style.display = 'none'
    options.style.top = '0'
    options.style.left = '0'
    options.style.bottom = '0'

}


function Select(e, ele, id) {
    let tbody = document.getElementById(id).getElementsByTagName('tr')

    for (let index = 0; index < tbody.length; index++) {
        const tr = tbody[index];

        tr.style.border = 'none'
        let por = (tr.getAttribute('portada') == 'true')

        if (por)
            tr.style.backgroundColor = 'rgb(27, 154, 212)'
        else if (index % 2 == 0)
            tr.style.backgroundColor = 'white'
        else
            tr.style.backgroundColor = '#f2f2f2'
    }

    ele.style.backgroundColor = '#ddd'
    ele.style.border = '2px solid rgb(27, 154, 212)'

    let portada = (ele.getAttribute('portada') == 'true')


    if (Boolean(portada)) {
        ele.style.backgroundColor = 'rgb(27, 154, 212)'
    }

    let x_pos = e.clientX

    switch (id) {
        case 'tbody-pedidos':
            temp.select_oreder = ele
            showOptions(x_pos, ele.offsetTop, 'options')
            break;
        case 'tbody-menu':
            showOptions(x_pos, ele.offsetTop, 'options-menus')
            temp.select_oreder_menu = ele
            break;
        case 'tbody-clientes':
            showOptions(x_pos, ele.offsetTop, 'options-client')
            temp.select_client = ele
            break;

        default:
            temp.select = ele
            break;
    }
}

function CreateInputfiled(id, placeholder, type = 'text') {
    let inputfiled = document.createElement('input')
    inputfiled.placeholder = placeholder
    inputfiled.id = id
    inputfiled.type = type
    return inputfiled
}

function CreateFileUpload(id, name) {
    let inputfiled = document.createElement('input')
    inputfiled.type = 'file'
    inputfiled.id = id
    inputfiled.name = name
    return inputfiled
}

function CreateCheckBox(id) {
    let inputfiled = document.createElement('input')
    inputfiled.type = "checkbox"
    inputfiled.id = id
    return inputfiled
}

function CreateLabel(id, text) {
    let label = document.createElement('label')
    label.id = id
    label.innerHTML = text.toString()
    return label
}