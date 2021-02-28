const {surat_masuk, undangan_masuk} = require('../models')

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
            res.render('detailSurat', {data})
            // res.send(data)
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