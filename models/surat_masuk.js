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

    getSeksie () {
      if (!this.disposisi_seksie || this.disposisi_seksie === "") {
        return "-"
      } else {
        return this.disposisi_seksie
      }
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
    nomor_surat: DataTypes.STRING,
    isi_disposisi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'surat_masuk',
    hooks : {
      afterFind (instance) {
        if (instance.disposisi_seksie) {
          instance.disposisi_seksie = (instance.disposisi_seksie).split(',')
        }

        if (instance.disposisi_staff) {
          instance.disposisi_staff = (instance.disposisi_staff).split(',')
        }
      }
    }
  });
  return surat_masuk;
};