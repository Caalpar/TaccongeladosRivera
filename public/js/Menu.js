class Menu {
    constructor(id, cat_id, image, titel_menu, price, descripion,disponible,open_shop) {
        this.id = id
        this.cat_id = cat_id
        this.image = image
        this.titel_menu = titel_menu,
        this.price = price
        this.descripion = descripion
        this.disponible = disponible
        this.open_shop = open_shop


    }
    get_menu() {

        let enabled = ''
        let addorder_function = 'onclick="addorder(this)"'
        let btn_addorder = '<div class = "addorder"></div>'

        if(!this.disponible)
        {
            enabled =  '<div class="triangle"></div>'
            addorder_function = ''
            btn_addorder = ''
        }

        if(!this.open_shop)
        {
            enabled =  '<div class="triangle-close"></div>'
            addorder_function = ''
            btn_addorder = ''
        }



        return `<div class ="food" ${addorder_function} id="menu_${this.id + '_' + this.cat_id}">
        ${enabled}
        <img src="${this.image}" alt="Norway" style="width:100%"> 
        ${btn_addorder}
        <div class ="food-description">
          
          <p><b>${this.titel_menu}</b><span class="food-price">$${this.price}</span></p>      
          <p>${this.descripion}</p>           
        </div></div>`
    }

}




