const { Exercise } = require('../models')
class ControllerExercise {
    static async createExercise(req, res) {
        let { name, type, muscle, equipment, difficulty, instructions } = req.body
        try {
            let exercise = await Exercise.create({ name, type, muscle, equipment, difficulty, instructions })
            res.status(201).json({
                name: exercise.name,
                type: exercise.type,
                muscle: exercise.muscle,
                equipment: exercise.equipment,
                difficulty: exercise.difficulty,
                instructions: exercise.instructions
            })
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = ControllerExercise