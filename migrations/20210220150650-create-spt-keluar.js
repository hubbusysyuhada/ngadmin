'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('spt_keluars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tanggal: {
        type: Sequelize.DATE
      },
      nomor_surat: {
        type: Sequelize.STRING
      },
      tujuan: {
        type: Sequelize.STRING
      },
      perihal: {
        type: Sequelize.TEXT
      },
      waktu: {
        type: Sequelize.DATE
      },
      tempat: {
        type: Sequelize.STRING
      },
      penyusun_konsep: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('spt_keluars');
  }
};