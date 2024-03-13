const express = require('express')
const router = express.Router()
const auth = require('./auth')
const ControllerExercise = require('../controllers/exercise')

router.use(auth)
router.post('/exercise', ControllerExercise.createExercise)
router.get('/exercise', ControllerExercise.showExercise)
router.delete('/exercise/:id', ControllerExercise.deleteExercise)

module.exports = router