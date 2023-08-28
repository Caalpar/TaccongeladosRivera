const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    id_user: String,
    id_pizzeria: String,
    payment_method: String,
    ids_menu: [{
        precio: Number,
        _id_menu: mongoose.Schema.Types.ObjectId,
        details: String
    }],
    id_delivery: String,
    date: Date,
    details: String,
    state: String,
    order_number: Number
});


module.exports = mongoose.model('Pedidos', pedidoSchema, 'pedidoCollection');