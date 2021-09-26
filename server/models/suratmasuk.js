'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SuratMasuk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SuratMasuk.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Tanggal: DataTypes.STRING,
    NoAgendaSubdit: DataTypes.STRING,
    NoAgendaDit: DataTypes.STRING,
    AsalSurat: DataTypes.TEXT,
    NomorSurat: DataTypes.TEXT,
    Tujuan: DataTypes.TEXT,
    TanggalSurat: DataTypes.STRING,
    Perihal: DataTypes.TEXT,
    DisposisiSeksie: DataTypes.STRING,
    DisposisiStaff: DataTypes.STRING,
    Catatan: DataTypes.TEXT,
    IsiDisposisi: DataTypes.TEXT,
    File: DataTypes.STRING,
    logs: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'SuratMasuk',
  });
  return SuratMasuk;
};