const {SuratKeluarController} = require('../controllers/suratKeluarController')
const router = require('express').Router()
const multer = require('multer')
const upload = multer({dest: 'helpers/'})

// Surat Keluar
router.get('/', SuratKeluarController.fetchAll)
router.get('/:id', SuratKeluarController.fetchOne)
router.put('/:id', SuratKeluarController.editOne)
router.post('/new', SuratKeluarController.createNew)
router.post('/book', SuratKeluarController.bookMany)
router.delete('/:id', SuratKeluarController.deleteOne)
router.post('/:id', upload.any(), SuratKeluarController.uploadFile)

module.exports = router