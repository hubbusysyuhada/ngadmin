'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let rawData = require('../data/SPT Keluar.json')
    rawData.forEach(spt => {
      spt.createdAt = new Date()
      spt.updatedAt = new Date()

      if (spt.Ditujukan) {
        let tempArr = spt.Ditujukan.split(',')
        spt.Ditujukan = tempArr.map(name => name.trim())
        spt.Ditujukan = JSON.stringify(spt.Ditujukan)
      }
    })
    await queryInterface.bulkInsert('SPTKeluars', rawData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SPTKeluars', null, {});
  }
};
