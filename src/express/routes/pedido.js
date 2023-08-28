const express = require('express')
    //const { ConfirmOrder, CreatePedido, AddDelivery, GetPedidoFromID, GetPedidosFromDelivery, GetPedidos, GetOrederState, CancelPedido, EditPedido } = require('../../mongodb/Controllers/pedido.js')
const pedidoControler = require('../../mongodb/Controllers/pedido.js')
const router = express.Router();

router.post('/create', async(req, res) => {
    let { id_cliente, id_Pizzeria, ids_menu, details, payment_method } = req.body
    pedidoControler.CreatePedido(id_cliente, id_Pizzeria, ids_menu, details, payment_method, res)


})

router.post('/adddelivery', (req, res) => {
    let { _id, _id_delivery } = req.body
    pedidoControler.AddDelivery(_id, _id_delivery, res)
})

router.post('/orderconfirm', (req, res) => {
    let { _id } = req.body
    pedidoControler.ConfirmOrder(_id, res)
})


router.post('/orderinprocess', (req, res) => {
    let { _id } = req.body
    pedidoControler.InProcessOrder(_id, res)
})

router.post('/cancel', (req, res) => {
    let { _id } = req.body
    pedidoControler.CancelPedido(_id, res)
})

router.get('/:id', (req, res) => {
    let id = req.params.id
    pedidoControler.GetOrederState(id, res)
})

router.post('/edit', (req, res) => {
    let { _id, ids_menu, details } = req.body
    pedidoControler.EditPedido(_id, ids_menu, details, res)
})

router.get('/delivery/:id', (req, res) => {
    let id = req.params.id
    pedidoControler.GetPedidosFromDelivery(id, res)
})

router.get('/pizzeria/:id', (req, res) => {
    let id = req.params.id
    pedidoControler.GetPedidos(id, res)
})


module.exports = router;