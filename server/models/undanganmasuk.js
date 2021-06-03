'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UndanganMasuk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UndanganMasuk.init({
    Tanggal: DataTypes.STRING,
    NoAgendaSubdit: DataTypes.STRING,
    NoAgendaDit: DataTypes.STRING,
    AsalSurat: DataTypes.TEXT,
    Tujuan: DataTypes.TEXT,
    NomorSurat: DataTypes.TEXT,
    TanggalSurat: DataTypes.STRING,
    Perihal: DataTypes.TEXT,
    Tempat: DataTypes.TEXT,
    Waktu: DataTypes.TEXT,
    DisposisiSeksie: DataTypes.STRING,
    DisposisiStaff: DataTypes.STRING,
    IsiDisposisi: DataTypes.TEXT,
    Catatan: DataTypes.TEXT,
    File: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UndanganMasuk',
  });
  return UndanganMasuk;
};