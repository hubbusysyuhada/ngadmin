const SuratMasukController = require('../controllers/suratMasukController')
const router = require('express').Router()

// surat masuk
router.get('/', SuratMasukController.fetchAll)
router.get('/:id', SuratMasukController.fetchOne)
router.put('/:id', SuratMasukController.editOne)
router.post('/new', SuratMasukController.newSuratMasuk)
router.delete('/:id', SuratMasukController.deleteOne)

module.exports = router