const {surat_masuk, undangan_masuk} = require('../models')
const capitalize = require('../helpers/capitalize')

class SuratMasukController {

    static suratMasuk (req, res) {
        surat_masuk.findAll({
            order : [
                ["id", "ASC"]
            ]
        })
        .then((data) => {
            res.render('surat_masuk', {data})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static searchSurat (req, res) { // belom selesai
        console.log(req.body);
        res.send(req.body)
    }

    static detailSurat (req, res) {
        surat_masuk.findOne({
            where : {
                id : req.params.id
            }
        })
        .then(data=> {
            // res.send(data)
            res.render('detailSurat', {data})
        })
        .catch(err => {
            res.send (err)
        })
    }

    static undanganMasuk (req, res) {
        res.render('undangan')
    }
}

module.exports = SuratMasukController