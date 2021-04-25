'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   let rawData = require('../data/undangan_masuk.json')
   let data = []

    for (let i = 0; i < rawData.length; i++) {
      if (rawData[i]["tanggal"] === "") {
        rawData[i]["tanggal"] = rawData[i-1]["tanggal"]
      }
    let temp = {
      Tanggal : (rawData[i]["tanggal"]) ? rawData[i]["tanggal"] : "",
      NoAgendaSubdit : rawData[i]["Nomor Agenda Subdit"],
      NoAgendaDit : rawData[i]["Nomor Agenda Dir"],
      AsalSurat : rawData[i]["Asal Surat"],
      Tujuan : rawData[i]["Ditujukan"],
      NomorSurat : rawData[i]["Nomor Surat"],
      TanggalSurat : rawData[i]["Tanggal Surat"],
      Perihal : rawData[i]["Perihal"],
      Tempat: rawData[i]['Tempat'],
      Waktu: rawData[i]['Waktu'],
      DisposisiSeksie : rawData[i]["Disposisi Seksi"],
      DisposisiStaff : rawData[i]["Disposisi Staff"],
      IsiDisposisi : rawData[i]["Isi Diposisi"],
      Catatan : rawData[i]["Catatan"],
      createdAt : new Date(),
      updatedAt : new Date()
    }
    if (temp.DisposisiSeksie === '') temp.DisposisiSeksie = []
    else {
      temp.DisposisiSeksie = temp.DisposisiSeksie.split(',')
      temp.DisposisiSeksie = temp.DisposisiSeksie.map(string => {
        let newString = string.trim()
        return newString.toLowerCase()
      })
    }

    if (temp.DisposisiStaff === '') temp.DisposisiStaff = []
    else {
      temp.DisposisiStaff = temp.DisposisiStaff.split(',')
      temp.DisposisiStaff = temp.DisposisiStaff.map(string => {
        let newString = string.trim()
        return newString.toLowerCase()
      })
    }

    temp.DisposisiSeksie = JSON.stringify(temp.DisposisiSeksie)
    temp.DisposisiStaff = JSON.stringify(temp.DisposisiStaff)

    data.push(temp)
   }
   return queryInterface.bulkInsert('UndanganMasuks', data , {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UndanganMasuks', null, {});
  }
};
