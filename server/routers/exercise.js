const express = require('express')
const router = express.Router()
const ControllerExercise = require('../controllers/exercise')

router.post('/exercise', ControllerExercise.createExercise)
router.get('/exercise', ControllerExercise.showExercise)
router.delete('/exercise/:id', ControllerExercise.deleteExercise)
router.put('/exercise/:id', ControllerExercise.updateExercise)

module.exports = router