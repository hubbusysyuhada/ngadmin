'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SuratKeluars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TanggalSurat: {
        type: Sequelize.STRING
      },
      NomorSurat: {
        type: Sequelize.STRING
      },
      Tujuan: {
        type: Sequelize.STRING
      },
      Perihal: {
        type: Sequelize.STRING
      },
      Waktu: {
        type: Sequelize.STRING
      },
      Tempat: {
        type: Sequelize.STRING
      },
      PenyusunKonsep: {
        type: Sequelize.STRING
      },
      File: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('SuratKeluars');
  }
};