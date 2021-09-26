'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('SPTKeluars', 'logs', {
      type: Sequelize.JSON,
      defaultValue: []
    })
    await queryInterface.addColumn('SuratKeluars', 'logs', {
      type: Sequelize.JSON,
      defaultValue: []
    })
    await queryInterface.addColumn('SuratMasuks', 'logs', {
      type: Sequelize.JSON,
      defaultValue: []
    })
    await queryInterface.addColumn('UndanganMasuks', 'logs', {
      type: Sequelize.JSON,
      defaultValue: []
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('SPTKeluars', 'logs', null)
    await queryInterface.removeColumn('SuratKeluars', 'logs', null)
    await queryInterface.removeColumn('SuratMasuks', 'logs', null)
    await queryInterface.removeColumn('UndanganMasuks', 'logs', null)
  }
};
