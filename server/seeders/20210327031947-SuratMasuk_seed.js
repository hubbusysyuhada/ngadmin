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
      Tanggal : (rawData[i]["Tanggal"]) ? rawData[i]["Tanggal"] : "",
      NoAgendaSubdit : rawData[i]["Nomor Agenda Subdit"],
      NoAgendaDit : rawData[i]["Nomor Agenda Dir"],
      AsalSurat : rawData[i]["Asal Surat"],
      Tujuan : rawData[i]["Ditujukan"],
      NomorSurat : rawData[i]["Nomor Surat"],
      TanggalSurat : rawData[i]["Tanggal Surat"],
      Perihal : rawData[i]["Perihal"],
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

    let tempTanggal = temp.Tanggal.split(' ')
    tempTanggal[1] = tempTanggal[1].toLowerCase()
    tempTanggal[1] = tempTanggal[1].split('')
    tempTanggal[1][0] = tempTanggal[1][0].toUpperCase()
    tempTanggal[1] = tempTanggal[1].join('')
    temp.Tanggal = tempTanggal.join(' ')

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

    for (let keys in temp) {
      if (!temp[keys]) temp[keys] = '-'
    }


    data.push(temp)
   }
   return queryInterface.bulkInsert('SuratMasuks', data , {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SuratMasuks', null, {});
  }
};
