const { Exercise } = require('../models')

class ControllerExercise {
    static async createExercise(req, res, next) {
        let { name, type, MuscleId, equipment, difficulty, instructions } = req.body
        try {
            let exercise = await Exercise.create({ name, type, MuscleId, equipment, difficulty, instructions })
            res.status(201).json({
                name: exercise.name,
                type: exercise.type,
                MuscleId: exercise.MuscleId,
                equipment: exercise.equipment,
                difficulty: exercise.difficulty,
                instructions: exercise.instructions
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async showExercise(req, res, next) {
        try {
            let exercise = await Exercise.findAll()
            res.status(200).json(exercise)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async deleteExercise(req, res, next) {
        let { id } = req.params
        try {
            let exercise = await Exercise.findByPk(id)
            if (!exercise) throw ({ name: 'Not Found', message: 'Exercise not found' })
            exercise.destroy()
            res.status(200).json({ message: 'Exercise successfully deleted' })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

}
module.exports = ControllerExercise