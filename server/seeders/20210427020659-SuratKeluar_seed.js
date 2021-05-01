'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let rawData = require('../data/Surat Keluar.json')
    rawData.forEach(surat => {
      surat.updatedAt = new Date()
      surat.createdAt = new Date()
    })
    await queryInterface.bulkInsert('SuratKeluars', rawData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SuratKeluars', null, {});
  }
};
