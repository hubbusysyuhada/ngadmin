const {surat_masuk} = require('../models/index')

class MainController {

    static home (req, res) {
       let session = req.session.currentSession
       if (session) {
              console.log(session.name, "<<<<< nama")
       }
        res.render('home', {session})
    }

    static suratKeluar (req, res) {
        res.render('surat_keluar')
    }

    static spt (req, res) {
        res.render('spt')
    }
}

module.exports = MainController