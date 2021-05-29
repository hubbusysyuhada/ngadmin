const {SuratKeluarController} = require('../controllers/suratKeluarController')
const router = require('express').Router()

// Surat Keluar
router.get('/', SuratKeluarController.fetchAll)
router.get('/:id', SuratKeluarController.fetchOne)
router.put('/:id', SuratKeluarController.editOne)
router.post('/new', SuratKeluarController.createNew)
router.post('/book', SuratKeluarController.bookMany)
router.delete('/:id', SuratKeluarController.deleteOne)

// router.delete('/:id', SuratMasukController.deleteOne)

module.exports = router