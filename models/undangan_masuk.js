'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class undangan_masuk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  undangan_masuk.init({
    tanggal: DataTypes.DATE,
    nomor_agenda_subdit: DataTypes.INTEGER,
    nomor_agenda_direktur: DataTypes.INTEGER,
    asal_surat: DataTypes.STRING,
    tujuan: DataTypes.STRING,
    nomor_surat: DataTypes.STRING,
    tanggal_surat: DataTypes.DATE,
    perihal: DataTypes.TEXT,
    tempat: DataTypes.STRING,
    waktu: DataTypes.DATE,
    disposisi_seksie: DataTypes.STRING,
    disposisi_staff: DataTypes.STRING,
    catatan: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'undangan_masuk',
  });
  return undangan_masuk;
};