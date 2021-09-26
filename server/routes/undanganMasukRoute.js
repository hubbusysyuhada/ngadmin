const UndanganMasukController = require('../controllers/UndanganMasukController')
const router = require('express').Router()
const multer = require('multer')
const upload = multer({dest: 'helpers/'})

// surat masuk
router.get('/', UndanganMasukController.fetchAll)
router.get('/:id', UndanganMasukController.fetchOne)
router.put('/:id', UndanganMasukController.editOne)
router.post('/new', UndanganMasukController.newUndanganMasuk)
router.delete('/:id', UndanganMasukController.deleteOne)
router.post('/:id', upload.any(), UndanganMasukController.uploadFile)

module.exports = router