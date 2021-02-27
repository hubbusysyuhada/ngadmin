'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('undangan_masuks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tanggal: {
        type: Sequelize.DATE
      },
      nomor_agenda_subdit: {
        type: Sequelize.INTEGER
      },
      nomor_agenda_direktur: {
        type: Sequelize.INTEGER
      },
      asal_surat: {
        type: Sequelize.STRING
      },
      tujuan: {
        type: Sequelize.STRING
      },
      nomor_surat: {
        type: Sequelize.STRING
      },
      tanggal_surat: {
        type: Sequelize.DATE
      },
      perihal: {
        type: Sequelize.TEXT
      },
      tempat: {
        type: Sequelize.STRING
      },
      waktu: {
        type: Sequelize.DATE
      },
      disposisi_seksie: {
        type: Sequelize.STRING
      },
      disposisi_staff: {
        type: Sequelize.STRING
      },
      catatan: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('undangan_masuks');
  }
};