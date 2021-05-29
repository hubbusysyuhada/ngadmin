'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SPTKeluars', {
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
      Ditujukan: {
        type: Sequelize.STRING
      },
      DalamRangka: {
        type: Sequelize.STRING
      },
      Waktu: {
        type: Sequelize.STRING
      },
      Tempat: {
        type: Sequelize.STRING
      },
      File: {
        type: Sequelize.STRING
      },
      PenyusunKonsep: {
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
    await queryInterface.dropTable('SPTKeluars');
  }
};