const express = require('express')
const router = express.Router()
const auth = require('./auth')
const exercise = require('./exercise')
const ControllerBmi = require('../controllers/bmi')
const authentication = require('../middlewares/authentication')

router.use(auth)
router.use(authentication)
router.use(exercise)
router.post('/bmi', ControllerBmi.getBmi)

module.exports = router