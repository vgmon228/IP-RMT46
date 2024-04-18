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
    try {
    let rest = await Promise.all(muscle.map(el => axios(options(el))))

    let data = rest.map((el, index) => {
      let newObj = [...el.data]
      newObj.forEach((l => {
        l.MuscleId = index + 1
        l.createdAt = new Date()
        l.updatedAt = new Date()
        delete l.muscle
      }))
      // console.log(el)
      return newObj
    })

    data = data.flat()
      await queryInterface.bulkInsert("Exercises", data, {})
      
    } catch (error) {
      await queryInterface.bulkInsert("Exercises", require("./exercise.json"), {})
      console.log(error)

      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Exercises', null, { truncate: true, cascade: true, restartIdentity: true })
  }
};
