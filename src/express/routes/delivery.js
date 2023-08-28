const express = require('express')
    //const { CreateDelivery, GetDelivery, GetDeliverys } = require('../../mongodb/Controllers/delivery.js')
const deliveryControler = require('../../mongodb/Controllers/delivery.js')
const router = express.Router();


router.post('/create', (req, res) => {
    let { name, last_name, matricula, vehiculo } = req.body
    deliveryControler.CreateDelivery(name, last_name, matricula, vehiculo, res)
})

router.get('/:id', (req, res) => {
    let id = req.params.id
    deliveryControler.GetDelivery(id, res)
})

router.get('/', (req, res) => {
    deliveryControler.GetDeliverys(res)
})


module.exports = router;