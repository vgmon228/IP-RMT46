const express = require('express')
const router = express.Router()
const auth = require('./auth')
const exercise = require('./exercise')
const ControllerBmi = require('../controllers/bmi')
const authentication = require('../middlewares/authentication')

router.use(auth)
router.use(exercise)
router.use(authentication)
router.post('/bmi', ControllerBmi.getBmi)

module.exports = router