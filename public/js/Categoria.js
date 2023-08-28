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



