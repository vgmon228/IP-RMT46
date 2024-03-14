'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [
      {
        name: 'biceps',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'chest',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'triceps',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'calves',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'shoulders',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await queryInterface.bulkInsert('Muscles', data, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Muscles', null, { truncate: true, cascade: true, restartIdentity: true })
  }
};
