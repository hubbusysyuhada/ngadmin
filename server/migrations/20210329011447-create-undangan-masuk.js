'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UndanganMasuks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Tanggal: {
        type: Sequelize.STRING
      },
      NoAgendaSubdit: {
        type: Sequelize.STRING
      },
      NoAgendaDit: {
        type: Sequelize.STRING
      },
      AsalSurat: {
        type: Sequelize.TEXT
      },
      Tujuan: {
        type: Sequelize.TEXT
      },
      NomorSurat: {
        type: Sequelize.TEXT
      },
      TanggalSurat: {
        type: Sequelize.STRING
      },
      Perihal: {
        type: Sequelize.TEXT
      },
      Tempat: {
        type: Sequelize.TEXT
      },
      Waktu: {
        type: Sequelize.TEXT
      },
      DisposisiSeksie: {
        type: Sequelize.STRING
      },
      DisposisiStaff: {
        type: Sequelize.STRING
      },
      IsiDisposisi: {
        type: Sequelize.TEXT
      },
      Catatan: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UndanganMasuks');
  }
};