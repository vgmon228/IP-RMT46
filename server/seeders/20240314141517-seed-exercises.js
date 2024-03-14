'use strict';
require('dotenv').config()
const axios = require('axios');
const ninja_key = process.env.API_NINJA

let muscle = ['biceps', 'chest', 'triceps', 'calves', 'shoulders']

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

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = []
      (async () => {
        try {
          for (let index = 0; index < muscle.length; index++) {
            const response = await axios.request(options(muscle[index]));
            response.data.map((e) => {
              delete e.muscle
              e.MuscleId = index + 1
              e.createdAt = new Date()
              e.updatedAt = new Date()
              data.push(e)
            })
            await queryInterface.bulkInsert('Exercises', data, {})
          }
        } catch (error) {
          console.error(error);
        }
      })()
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Exercises', null, { truncate: true, cascade: true, restartIdentity: true })
  }
};
