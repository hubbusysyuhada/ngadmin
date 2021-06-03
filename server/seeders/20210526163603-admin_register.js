'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        "id": 1,
        "username": "admin",
        "password": "$2a$10$mamnBC9V.PX6kRJEma8HtuN1bclrFuxEc7.U9GhRE8ZiNlzhegf92",
        "name": "admin",
        "createdAt": "2021-06-03 06:25:47.699+00",
        "updatedAt": "2021-06-03 06:25:47.699+00"
      },
      {
        "id": 2,
        "username": "Bayu",
        "password": "$2a$10$j9AzFnkxJ.25.TqmrfOYMeoaeanZT3FWM9aZEk2r1aTRCRD2wJ7Nm",
        "name": "Bayu",
        "createdAt": "2021-06-03 06:30:56.04+00",
        "updatedAt": "2021-06-03 06:30:56.04+00"
      },
      {
        "id": 3,
        "username": "Nila",
        "password": "$2a$10$YyALic.aSUWE67vyg1EwjeYCqflfBeEqa43FQGcn.TIu1hXKyXoeS",
        "name": "Nila",
        "createdAt": "2021-06-03 06:47:45.955+00",
        "updatedAt": "2021-06-03 06:47:45.955+00"
      }
    ], null)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
