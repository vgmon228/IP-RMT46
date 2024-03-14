const { Exercise } = require('../models')
const axios = require('axios');
const ninja_key = process.env.API_NINJA

function options(value) {
    return {
        method: 'GET',
        url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
        params: { muscle: value },
        headers: {
            'X-RapidAPI-Key': ninja_key,
            'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
        }
    }
};

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

    static async showExercise(req, res) {
        try {
            let exercise = await Exercise.findAll()
            res.status(200).json(exercise)
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteExercise(req, res) {
        let { id } = req.params
        try {
            let exercise = await Exercise.findByPk(id)
            exercise.destroy()
            res.status(200).json({ message: 'Exercise successfully deleted' })
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = ControllerExercise