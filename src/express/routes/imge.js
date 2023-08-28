const express = require('express')
const path = require('path')


const router = express.Router();

router.get('/:name', (req, res) => {
    let name = req.params.name
    res.sendFile(path.join(__dirname, `../../assets/imgs/${name}`))
})




module.exports = router;