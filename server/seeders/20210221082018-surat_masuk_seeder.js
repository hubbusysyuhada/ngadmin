'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   let rawData = require('../data/surat_masuk.json')
   let data = []

    for (let i = 0; i < rawData.length; i++) {
      if (rawData[i]["Tanggal"] === "") {
        rawData[i]["Tanggal"] = rawData[i-1]["Tanggal"]
      }
    let temp = {
      tanggal : (rawData[i]["Tanggal"]) ? rawData[i]["Tanggal"] : "",
      nomor_agenda_subdit: rawData[i]["Nomor Agenda Subdit"],
      nomor_agenda_direktur : rawData[i]["Nomor Agenda Dir"],
      asal_surat : rawData[i]["Asal Surat"],
      tujuan : rawData[i]["Ditujukan"],
      nomor_surat : rawData[i]["Nomor Surat"],
      tanggal_surat : rawData[i]["Tanggal Surat"],
      perihal : rawData[i]["Perihal"],
      disposisi_seksie : rawData[i]["Disposisi Seksi"],
      disposisi_staff : rawData[i]["Disposisi Staff"],
      isi_disposisi : rawData[i]["Isi Diposisi"],
      isi_disposisi : rawData[i]["Catatan"],
      createdAt : new Date(),
      updatedAt : new Date()
    }
    data.push(temp)
   }
   return queryInterface.bulkInsert('surat_masuks', data , {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('surat_masuks', null, {});
  }
};
