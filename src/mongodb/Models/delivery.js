const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({       
    _name: String,
    last_name: String,
    matricula:String,
    vehiculo:String,
});


module.exports = mongoose.model('Delivery',deliverySchema,'deliveryCollection');