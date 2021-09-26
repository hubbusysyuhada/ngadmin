'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SuratKeluar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SuratKeluar.init({
    TanggalSurat: DataTypes.STRING,
    NomorSurat: DataTypes.STRING,
    Tujuan: DataTypes.STRING,
    Perihal: DataTypes.STRING,
    Waktu: DataTypes.STRING,
    Tempat: DataTypes.STRING,
    PenyusunKonsep: DataTypes.STRING,
    File: DataTypes.STRING,
    logs: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'SuratKeluar',
  });
  return SuratKeluar;
};