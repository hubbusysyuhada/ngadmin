const fs = require('fs')
const {surat_masuk} = require('../models/index')

class MainController {

    static home (req, res) {
        res.render('home')
    }

    static logIn (req, res) {
        res.render('login')
    }

    static suratMasuk (req, res) {

        surat_masuk.findAll()
        .then((data) => {
            console.log(data);
            res.render('surat_masuk', {data})
        })
        .catch((err) => {
            res.send(err)
        })

    }

    static undanganMasuk (req, res) {
        res.render('undangan')
    }

    static suratKeluar (req, res) {
        res.render('surat_keluar')
    }

    static spt (req, res) {
        res.render('spt')
    }
}

module.exports = MainController