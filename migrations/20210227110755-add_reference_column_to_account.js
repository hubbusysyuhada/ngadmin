'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Accounts","reference", {
      type : Sequelize.INTEGER,
      references : {
        model : "Accounts",
        key : "id"
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Accounts", "reference")
  }
};
