'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let rawData = require('../data/SPT Keluar.json')
    for (let i = 0; i < rawData.length; i++) {
      let spt = rawData[i]
      spt.createdAt = new Date()
      spt.updatedAt = new Date()
      spt.File = null
      if (spt.Ditujukan) {
        let tempArr = spt.Ditujukan.split(',')
        spt.Ditujukan = tempArr.map(name => name.trim())
        spt.Ditujukan = JSON.stringify(spt.Ditujukan)
      }
      
      if (!spt.TanggalSurat) {
        spt.TanggalSurat = rawData[i - 1].TanggalSurat
      }

      if (typeof spt.NomorSurat === 'number') {
        let temp = new Date(spt.TanggalSurat).toLocaleString().split(',')[0].split('/') // month - day - year
        if (spt.NomorSurat < 10) spt.NomorSurat = `0${spt.NomorSurat}`
        if (temp[0] < 10) temp[0] = `0${temp[0]}`
        spt.NomorSurat = `ST.${spt.NomorSurat}/REN/SUBDIT-PWAP/${temp[0]}/${temp[2]}`
        spt.Ditujukan = 'booked'
        spt.DalamRangka = 'booked'
        spt.Waktu = 'booked'
        spt.Tempat = 'booked'
      }  
    }
    await queryInterface.bulkInsert('SPTKeluars', rawData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SPTKeluars', null, {});
  }
};
