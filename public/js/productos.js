let menu_edit = document.getElementById('Menus')
let menu_edit_modal = new Modal('edit_menu')

window.addEventListener('load', (event) => {
    CreateModalEditMenu()

    let drop_search_cat = document.getElementById('search-menus-cat')
    let menus_to_search = JSON.parse(localStorage.getItem('categorias'))

    let op = document.createElement('option')
    op.value = 'ALL'
    op.innerHTML = 'Todo'
    drop_search_cat.appendChild(op)

    for (let index = 0; index < menus_to_search.length; index++) {
        const menu = menus_to_search[index].categoria;
        let op = document.createElement('option')
        op.value = menu
        op.innerHTML = menu
        drop_search_cat.appendChild(op)
    }

})

function SeachCatInDrop(id, id_drop) {
    let tbody_new_oreder = document.getElementById(id).rows
    let dorp_cat_search = document.getElementById(id_drop).value

    console.log(dorp_cat_search.value)

    for (let index = 0; index < tbody_new_oreder.length; index++) {
        const row = tbody_new_oreder[index];
        let cat_find = row.cells[0].innerHTML

        if (cat_find == dorp_cat_search || dorp_cat_search == 'ALL') {
            row.style.display = ''
        } else {
            row.style.display = 'none'
        }

    }
}


function ShowModalMenuEdit() {
    let modal = document.getElementById('modal_edit_menu')
    if (temp.select_oreder_menu) {
        let data_ele = temp.select_oreder_menu.getElementsByTagName('td')

        let categoria = data_ele[0].innerHTML
        let title = data_ele[1].innerHTML
        let description = data_ele[2].innerHTML
        let price = parseFloat(data_ele[3].innerHTML.substring(1))
        let disponibilidad = false
        if (data_ele[4].innerHTML == 'si')
            disponibilidad = true


        document.getElementById('inputfiled_menu_edit_precio').value = price
        document.getElementById('inputfiled_menu_edit_titulo').value = title
        document.getElementById('inputfiled_menu_edit_descripcion').value = description
        document.getElementById('checkbox_menu_edit_disponivilidad').checked = disponibilidad
        document.getElementById('label_edit_cat').innerHTML = 'Categoria: ' + categoria


        modal.style.display = 'block'
    } else
        alert('seleccione un producto para editar')





}


function CreateModalEditMenu() {
    let h1_menu_edit = document.createElement('h1')
    h1_menu_edit.innerHTML = 'Editar Producto'

    let form_edit_menu = document.createElement('form')
    let inputfiled_menu_edit_precio = CreateInputfiled('inputfiled_menu_edit_precio', 'precio', 'number')
    let inputfiled_menu_edit_titulo = CreateInputfiled('inputfiled_menu_edit_titulo', 'titulo')
    let inputfiled_menu_edit_descripcion = CreateInputfiled('inputfiled_menu_edit_descripcion', 'descripcion')

    let label_edit_dis = CreateLabel('label_edit_disponibilidad', 'disponibilidad')
    label_edit_dis.style.marginRight = "1%"
    let CheckBox_menu_edit_disponibilidad = CreateCheckBox('checkbox_menu_edit_disponivilidad')

    let content_dis = document.createElement('div')
    content_dis.appendChild(label_edit_dis)
    content_dis.appendChild(CheckBox_menu_edit_disponibilidad)

    let label_edit_cat = CreateLabel('label_edit_cat', 'categoria')

    let label_edit_menu_foto = CreateLabel('label_edit_foto', 'Foto del producto')
    let UploadFile_edit = CreateFileUpload('upload_edit_file', 'image')
    UploadFile_edit.multiple = true

    let button_edit_menu = document.createElement('button')
    button_edit_menu.type = 'submit'
    button_edit_menu.innerHTML = 'Editar'
    button_edit_menu.setAttribute("onclick", "EditMenu(event)")

    inputfiled_menu_edit_precio.required = true
    inputfiled_menu_edit_titulo.required = true

    form_edit_menu.appendChild(h1_menu_edit)
    form_edit_menu.appendChild(inputfiled_menu_edit_precio)
    form_edit_menu.appendChild(inputfiled_menu_edit_titulo)
    form_edit_menu.appendChild(inputfiled_menu_edit_descripcion)
    form_edit_menu.appendChild(content_dis)
    form_edit_menu.appendChild(label_edit_cat)
    form_edit_menu.appendChild(label_edit_menu_foto)
    form_edit_menu.appendChild(UploadFile_edit)
    form_edit_menu.appendChild(button_edit_menu)

    menu_edit_modal.setModalContent(form_edit_menu)

    menu_edit.appendChild(menu_edit_modal.getModal())

}

function ShowModalEditCat() {
    document.getElementById('modal_cat_edit').style.display = 'block'
}

function SetPortada(id) {


    let _id = id
    let _id_pizzeria = localStorage.getItem('_id_pizzeria')
    let row = document.getElementById(id).cells
    let categoria = row[0].innerHTML
    let titulo = row[1].innerHTML
    let descripcion = row[2].innerHTML
    let precio = row[3].innerHTML
    let disponibilidad = row[4].innerHTML
    console.log(categoria)

    let menu = {
        _id,
        precio,
        descripcion,
        titulo,
        img: '',
        disponibilidad
    }

    let body = JSON.stringify({ menu, _id_pizzeria, categoria })

    fetch('/pizzeria/setportada', {
            method: 'POST',
            body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            location.reload();

        }).catch((error) => {
            console.log(error);
        })
}


function EditMenu(e) {

    e.preventDefault()

    if (temp.select_oreder_menu) {


        let _id = temp.select_oreder_menu.id
        let precio = document.getElementById('inputfiled_menu_edit_precio').value
        let titulo = document.getElementById('inputfiled_menu_edit_titulo').value

        if (precio && titulo) {
            let descripcion = document.getElementById('inputfiled_menu_edit_descripcion').value
            let disponibilidad = document.getElementById('checkbox_menu_edit_disponivilidad').checked
            let categoria = document.getElementById('label_edit_cat').innerHTML.split(':')[1].substring(1)

            let _id_pizzeria = localStorage.getItem('_id_pizzeria')

            let files = document.getElementById('upload_edit_file').files

            form = new FormData()
            let img = ''

            console.log(files.length)

            if (files.length > 0) {
                let file = files[0]
                img = file.name.replace(/ /g, '')
                form.append('imge', file, img)
            }


            let menu = {
                _id,
                precio,
                descripcion,
                titulo,
                img,
                disponibilidad
            }

            let data_send = { menu, _id_pizzeria, categoria }
            form.append('data_send', JSON.stringify(data_send))

            fetch('/pizzeria/editmenu', {
                    method: 'POST',
                    body: form
                })
                .then(response => response.json())
                .then(data => {

                    console.log(data)
                    location.reload();

                }).catch((error) => {
                    console.log(error);
                })
        }
    }

}

function DeleteMenu() {
    if (temp.select_oreder_menu) {
        let con = confirm('Esta Seguro que quiere eliminar el producto')
        if (con) {

            let data_ele = temp.select_oreder_menu.getElementsByTagName('td')

            let categoria = data_ele[0].innerHTML

            let _id = temp.select_oreder_menu.id
            let _id_pizzeria = localStorage.getItem('_id_pizzeria')
            let send_data = { _id, _id_pizzeria, categoria }

            fetch('/pizzeria/deletemenu', {
                    method: 'DELETE',
                    body: JSON.stringify(send_data),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)

                }).catch((error) => {
                    console.log(error);
                })


        }
    }
}

function CreateMenu(e) {

    e.preventDefault()

    let disponibilidad = document.getElementById('checkbox_menu_disponivilidad').checked
    let precio = document.getElementById('inputfiled_menu_precio').value
    let descripcion = document.getElementById('inputfiled_menu_descripcion').value
    let titulo = document.getElementById('inputfiled_menu_titulo').value
    let files = document.getElementById('upload_file').files

    if (precio && titulo && (files.length > 0)) {
        let file = files[0]
        form = new FormData()

        let img = file.name.replace(/ /g, '')
        form.append('imge', file, img)

        console.log(file.name)

        let menu = { disponibilidad, precio, titulo, descripcion, img }



        let categoria = document.getElementById('drop_cat_menu').value
        let _id_pizzeria = id_pizzeria

        let user_data = {
            _id_pizzeria,
            categoria,
            menu
        }

        form.append('user_data', JSON.stringify(user_data))




        fetch('/pizzeria/addmenu', {
                method: 'POST',
                body: form
            })
            .then(response => response.json())
            .then(data => {

                if (data.pizz) {
                    ShowMenusLists(data.pizz)
                    document.getElementById('close_modal_menu').click()
                    alert('El producto fue creado correctamente')
                }

            }).catch((error) => {
                console.log(error);
            })
    }

}

function ShowMenusLists(p) {
    let tbody = document.getElementById('tbody-menu')
    setTimeout(() => {
        let tbody_new_oreder = document.getElementById('tbody-new-order')
        let tbody_edit_oreder = document.getElementById('tbody-oreder-edit-1')
        let menu = document.getElementById('Menus')

        let drop_cat_edit = new DropDown('drop_cat_edit')
        let modal_cat_edit = new Modal('cat_edit')

        let drop_cat_delete = new DropDown('drop_cat_delete')
        let modal_cat_delete = new Modal('cat_delete')

        tbody.innerHTML = ''
        tbody_new_oreder.innerHTML = ''

        p.menus.forEach(me => {

            drop_cat_edit.addOption(me.categoria, me._id)
            drop_cat_delete.addOption(me.categoria, me._id)
            if (me.menu.length > 0) {
                me.menu.forEach(m => {

                    console.log(m.portada)
                    let tr = CreateMenuRow(m._id, me.categoria, m.titulo, m.descripcion, m.precio, m.disponibilidad, m.img, m.portada)
                    let tr_new_order = CreateNewOrderRow(m._id, me.categoria, m.titulo, m.precio, m.disponibilidad)
                    let tr_edit_order = CreateEditOrderRow('oreder_edit_' + m._id, me.categoria, m.titulo, m.precio, m.disponibilidad)
                    tbody.appendChild(tr)
                    tbody_new_oreder.appendChild(tr_new_order)
                    if (m.disponibilidad)
                        tbody_edit_oreder.appendChild(tr_edit_order)
                });
            }
        });

        // modal delete cat
        let h1_menu_delete = document.createElement('h1')
        h1_menu_delete.innerHTML = 'Eliminar Categoria'

        modal_cat_delete.setModalContent(h1_menu_delete)

        modal_cat_delete.setModalContent(drop_cat_delete.getDrop())

        let button_cat_delete = document.createElement('button')
        button_cat_delete.type = 'submit'
        button_cat_delete.innerHTML = 'Eliminar'
        button_cat_delete.setAttribute("onclick", "DeleteCat()")

        modal_cat_delete.setModalContent(button_cat_delete)

        menu.appendChild(modal_cat_delete.getModal())

        // modal edit cat

        let form_cat_edit = document.createElement('form')
        let content_cat_edit = document.createElement('div')

        let h1_cat_edit = document.createElement('h1')
        h1_cat_edit.innerHTML = 'Editar Categoria'

        modal_cat_edit.setModalContent(h1_cat_edit)

        let inputfiled_cat_edit = CreateInputfiled('inputfiled_cat_edit', 'nueva categoria')
        inputfiled_cat_edit.required = true


        let button_cat_edit = document.createElement('button')
        button_cat_edit.type = 'submit'
        button_cat_edit.innerHTML = 'Editar'
        button_cat_edit.setAttribute("onclick", "EditCat()")

        drop_cat_edit.setClass("p-10px")
        drop_cat_edit.setClass("mr-1p")
        inputfiled_cat_edit.classList.add("p-10px", "mr-1p")
        button_cat_edit.classList.add("p-10px")

        content_cat_edit.appendChild(drop_cat_edit.getDrop())
        content_cat_edit.appendChild(inputfiled_cat_edit)
        content_cat_edit.appendChild(button_cat_edit)

        form_cat_edit.appendChild(content_cat_edit)

        modal_cat_edit.setModalContent(form_cat_edit)

        menu.appendChild(modal_cat_edit.getModal())


    }, 2000);

}

function EditCat() {

    let categoria = document.getElementById('inputfiled_cat_edit').value

    if (categoria) {
        let _id_cat = document.getElementById('drop_cat_edit').value
        let _id_pizzeria = localStorage.getItem('_id_pizzeria')

        let send_data = { categoria, _id_cat, _id_pizzeria }

        fetch('/pizzeria/editcategoria', {
                method: 'POST',
                body: JSON.stringify(send_data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {

                location.reload();
                console.log(data)

            }).catch((error) => {
                console.log(error);
            })

    }

}

function ShowModaleDeleteCat() {
    document.getElementById('modal_cat_delete').style.display = 'block'
}

function DeleteCat() {

    let cat = document.getElementById('drop_cat_delete')
    let categoria = cat.options[cat.selectedIndex].textContent
    let con = confirm(`Si elimina esta categoria borrara todos los productos que contiene
    ¿Esta seguro que desea eliminar la categoria: ${categoria}?`)
    if (con) {

        let _id_pizzeria = localStorage.getItem('_id_pizzeria')
        let send_data = { categoria, _id_pizzeria }

        fetch('/pizzeria/deletecategoria', {
                method: 'DELETE',
                body: JSON.stringify(send_data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {

                //location.reload();
                console.log(data)

            }).catch((error) => {
                console.log(error);
            })
    }

    //   router.delete('/deletecategoria',(req,res)=>{
    //     let{_id_pizzeria,categoria} = req.body
    //     DeleteCategoria(_id_pizzeria,categoria,res)
    // })

}