const {SuratMasukController} = require('../controllers/')

const router = require('express').Router()

router.get('/surat', SuratMasukController.suratMasuk)
router.post('/surat', SuratMasukController.searchSurat)
router.get('/undangan', SuratMasukController.undanganMasuk)
router.get('/surat/:id', SuratMasukController.detailSurat)


module.exports = router