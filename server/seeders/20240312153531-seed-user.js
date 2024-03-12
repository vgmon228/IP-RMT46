'use strict';

const { hashPassword } = require('../helper/bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users',[{
      username:'admin',
      email:'admin@admin.com',
      password:hashPassword('12345'),
      createdAt: new Date(),
      updatedAt:new Date()
    }],{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true })
  }
};
