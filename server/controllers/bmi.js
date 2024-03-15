const axios = require('axios');
const bmi_key = process.env.API_BMI
const { Bmi } = require('../models')
function options(height, weight) {
    return {
        method: 'GET',
        url: `https://simple-bmi-calculator1.p.rapidapi.com/calculate/metric/${height}/${weight}`,
        headers: {
            'X-RapidAPI-Key': bmi_key,
            'X-RapidAPI-Host': 'simple-bmi-calculator1.p.rapidapi.com'
        }
    };
}

class ControllerBmi {
    static async getBmi(req, res, next) {
        let { height, weight } = req.body
        try {
            const response = await axios.request(options(height, weight));
            let { height, weight, bmi, status } = response.data
            let bmiuser = await Bmi.create({ UserId: req.user.id, bmi, status })
            res.status(201).json({ bmiuser })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async showBmi(req, res, next) {
        try {
            let bmi = await Bmi.findOne({ where: { UserId: req.user.id } })
            res.status(200).json({ bmi })
        } catch (error) {
            next(error)
        }
    }

    static async deleteBmi(req, res, next) {
        let { id } = req.params
        try {
            let bmi = await Bmi.findByPk(id)
            if (!bmi) throw ({ name: 'Not Found', message: 'Bmi not found' })
            res.status(200).json({ message: 'Bmi successfully deleted' })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerBmi