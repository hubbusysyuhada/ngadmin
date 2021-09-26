const { SPTKeluarController } = require('../controllers/SPTKeluarController')
const router = require('express').Router()
const multer = require('multer')
const upload = multer({dest: 'helpers/'})

// SPT Keluar
router.get('/', SPTKeluarController.fetchAll)
router.get('/:id', SPTKeluarController.fetchOne)
router.put('/:id', SPTKeluarController.editOne)
router.post('/new', SPTKeluarController.newSPT)
router.post('/book', SPTKeluarController.bookSPT)
router.delete('/:id', SPTKeluarController.deleteOne)
router.post('/:id', upload.any(), SPTKeluarController.uploadFile)

module.exports = router