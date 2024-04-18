const express = require('express')
const router = express.Router()
const ControllerExercise = require('../controllers/exercise')

router.post('/exercise', ControllerExercise.createExercise)
router.get('/exercise', ControllerExercise.showExercise)
router.get('/exercise/:id', ControllerExercise.getExerciseById)
router.delete('/exercise/:id', ControllerExercise.deleteExercise)
router.put('/exercise/:id', ControllerExercise.updateExercise)
router.get('/muscle',ControllerExercise.getMuscle)

module.exports = router