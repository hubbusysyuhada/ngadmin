const SuratMasukController = require('../controllers/suratMasukController')
const router = require('express').Router()
const multer = require('multer')
const upload = multer({dest: 'helpers/'})


// surat masuk
router.get('/', SuratMasukController.fetchAll)
router.get('/:id', SuratMasukController.fetchOne)
router.put('/:id', SuratMasukController.editOne)
router.post('/new', SuratMasukController.newSuratMasuk)
router.delete('/:id', SuratMasukController.deleteOne)
router.post('/:id', upload.any(), SuratMasukController.uploadFile)


module.exports = router