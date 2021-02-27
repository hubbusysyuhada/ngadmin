const {surat_masuk} = require('../models/index')

class MainController {

    static home (req, res) {
       let session = req.session.currentSession
       if (session) {
              console.log(session.name, "<<<<< nama")
       }
        res.render('home', {session})
    }

    static suratMasuk (req, res) {

        surat_masuk.findAll()
        .then((data) => {
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