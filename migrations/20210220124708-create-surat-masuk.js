'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('surat_masuks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tanggal: {
        type: Sequelize.STRING
      },
      nomor_agenda_subdit: {
        type: Sequelize.STRING
      },
      nomor_agenda_direktur: {
        type: Sequelize.STRING
      },
      asal_surat: {
        type: Sequelize.STRING
      },
      tujuan: {
        type: Sequelize.STRING
      },
      tanggal_surat: {
        type: Sequelize.STRING
      },
      perihal: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('surat_masuks');
  }
};