class ListPedido {
    constructor(id, cont, description, price) {
        this.id = id
        this.cont = cont
        this.description = description
        this.price = price
    }


    get_pedido() {
        return ` <article id="menu_${this.id}" style="width:100%; height:50px">
                    <div class="order-content">
                        <button class="btn-count" onclick="remove_pedido(this)">-</button><span class="count" id="count">${this.cont}</span><button class="btn-count" onclick="add_pedido(this)">+</button>
                    </div>
                    <div class="order-content">
                        <div class="text-count">${this.description}</div>
                    </div>
                    <div class="order-content" id="price">$${this.price}
                    </div>
                </article>`
    }



}
