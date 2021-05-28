'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const bcrypt = require('bcryptjs')
    const username = 'admin'
    const password = bcrypt.hashSync('admin', 10)
    const name = 'admin'
    await queryInterface.bulkInsert('Users', [
      {
        username,
        password,
        name,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], null)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
