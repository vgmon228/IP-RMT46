const axios = require('axios');
const bmi_key = process.env.API_BMI
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
            if (!height) throw ({ name: 'Bad Request', message: 'height/weight is required' })
            if (!weight) throw ({ name: 'Bad Request', message: 'height/weight is required' })
            const response = await axios.request(options(height, weight));
            let { bmi, status } = response.data
            res.status(200).json({ bmi, status })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = ControllerBmi