const MainController = require('../controllers/mainController')

const router = require('express').Router()

router.get('/surat', MainController.suratKeluar)
router.get('/spt', MainController.spt)

module.exports = router