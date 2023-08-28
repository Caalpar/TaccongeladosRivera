const express = require('express')
const router = express.Router();

router.use('/delivery', require('../delivery'));

router.use('/pizzeria', require('../pizzeria'));

router.use('/pedido', require('../pedido'));

router.use('/user', require('../user'));

router.use('/imge', require('../imge'))


module.exports = router;