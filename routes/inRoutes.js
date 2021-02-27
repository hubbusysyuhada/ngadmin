const MainController = require('../controllers/mainController')

const router = require('express').Router()

router.get('/surat', MainController.suratMasuk)
router.get('/undangan', MainController.undanganMasuk)

module.exports = router