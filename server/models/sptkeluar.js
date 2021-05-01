'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SPTKeluar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SPTKeluar.init({
    TanggalSurat: DataTypes.STRING,
    NomorSurat: DataTypes.STRING,
    Ditujukan: DataTypes.STRING,
    DalamRangka: DataTypes.STRING,
    Waktu: DataTypes.STRING,
    Tempat: DataTypes.STRING,
    File: DataTypes.STRING,
    PenyusunKonsep: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SPTKeluar',
  });
  return SPTKeluar;
};