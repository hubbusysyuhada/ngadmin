'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class surat_masuk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  surat_masuk.init({
    tanggal: DataTypes.DATE,
    nomor_agenda_subdit: DataTypes.STRING,
    nomor_agenda_direktur: DataTypes.STRING,
    asal_surat: DataTypes.STRING,
    tujuan: DataTypes.STRING,
    tanggal_surat: DataTypes.STRING,
    perihal: DataTypes.TEXT,
    disposisi_seksie: DataTypes.STRING,
    disposisi_staff: DataTypes.STRING,
    catatan: DataTypes.TEXT,
    nomor_surat: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'surat_masuk',
  });
  return surat_masuk;
};