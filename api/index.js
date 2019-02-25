const express = require('express')
const router = express.Router()

const sowpods = require('./sowpods')

router.use('/sowpods', sowpods)

module.exports = router
