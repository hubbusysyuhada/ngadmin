'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class surat_keluar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  surat_keluar.init({
    tanggal: DataTypes.DATE,
    nomor_surat: DataTypes.STRING,
    tujuan: DataTypes.STRING,
    perihal: DataTypes.TEXT,
    waktu: DataTypes.DATE,
    tempat: DataTypes.STRING,
    penyusun_konsep: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'surat_keluar',
  });
  return surat_keluar;
};