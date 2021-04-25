'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SuratMasuks', {
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
        type: Sequelize.STRING,
      },
      NoAgendaDit: {
        type: Sequelize.STRING
      },
      AsalSurat: {
        type: Sequelize.TEXT
      },
      NomorSurat: {
        type: Sequelize.TEXT
      },
      Tujuan: {
        type: Sequelize.TEXT
      },
      TanggalSurat: {
        type: Sequelize.STRING
      },
      Perihal: {
        type: Sequelize.TEXT
      },
      DisposisiSeksie: {
        type: Sequelize.STRING
      },
      DisposisiStaff: {
        type: Sequelize.STRING
      },
      Catatan: {
        type: Sequelize.TEXT
      },
      IsiDisposisi: {
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
    await queryInterface.dropTable('SuratMasuks');
  }
};