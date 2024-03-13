const express = require('express')
const router = express.Router()
const auth = require('./auth')
const exercise = require('./exercise')


router.use(auth)
router.use(exercise)

module.exports = router