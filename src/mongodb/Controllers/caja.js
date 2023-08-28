const Caja = require('../Models/caja.js')
const { SendClient, ingersos, egresos } = require('../../tools/tools.js')

function CrearCaja(user_id, res) {
    Caja.find({ user_id }, async(err, caja) => {
        if (err) throw err

        if (caja)
            SendClient(res, { msg: 'ya existe una caja registrada para este usuario' })
        else {
            let newCaja = new Caja({ user_id, abierta: false })
            await newCaja.save()
        }
    })
}

function AbrirCaja(user_id, fecha_apertura, monto_inicial, res) {
    Caja.findOne({ user_id }, async(err, caja) => {
        if (err) throw err

        if (caja) {

            let importes = [{
                detalles: 'apertura de caja',
                tipo: ingersos,
                monto: monto_inicial
            }]

            let history = {
                fecha_apertura,
                importes,
                abierta: true
            }

            caja.history.push(history)
            await caja.save()
            SendClient(res, { msg: 'se ha abierto la caja correctamente' })
        }


    })
}


function ActualizarCaja(user_id, monto, detalles, tipo, res) {
    Caja.findOne({ user_id, 'history.abierta': true }, async(err, caja) => {
        if (err) throw err

        if (caja) {
            let index_history = caja.history.findIndex(h => h.abierta == true)
            let c_tipo = ''

            if (tipo == 0)
                c_tipo = ingersos
            else if (tipo == 1)
                c_tipo = egresos


            let importe = {
                detalles,
                tipo: c_tipo,
                monto
            }
            caja.history[index_history].importes.push(importe)
            await caja.save()
            SendClient(res, { msg: 'la caja se a actualizado correctamente' })
        } else {
            SendClient(res, { msg: 'no se a podido actualizar la caja' })
        }
    })
}


function CerrarCaja(user_id, fecha_cierre, res) {
    Caja.findOne({ user_id, 'history.abierta': true }, async(err, caja) => {
        if (err) throw err

        if (caja) {
            let index_history = caja.history.findIndex(h => h.abierta == true)
            caja.history[index_history].abierta = false
            caja.history[index_history].fecha_cierre = fecha_cierre
            await caja.save()
            SendClient(res, { msg: 'la caja se a cerrado correctamente' })
        } else {
            SendClient(res, { msg: 'no se a podido cerrar la caja' })
        }
    })

}

const getCajaID = async() => {
    cajas = await Caja.find()

    let res = undefined
    let len_min = 10000


    cajas.forEach(caja => {

        if (caja.history[caja.history.length - 1].importes.length < len_min) {
            len_min = caja.history[caja.history.length - 1].importes.length
            res = caja._id
        }

    });

    return res
}

function HistorialCaja(fecha_apertura, res) {
    Caja.find({ fecha_apertura }, async(err, caja) => {
        if (err) throw err

        if (cajas)
            SendClient(res, { msg: 'las cajas se han envido correctamente', cajas })
        else
            SendClient(res, { msg: 'no se encontraron las cajas' })


    })
}


module.exports = {
    CrearCaja,
    AbrirCaja,
    ActualizarCaja,
    CerrarCaja,
    HistorialCaja,
    getCajaID
}