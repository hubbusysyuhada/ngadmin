const { SPTKeluarController } = require('../controllers/SPTKeluarController')
const router = require('express').Router()

// SPT Keluar
router.get('/', SPTKeluarController.fetchAll)
router.get('/:id', SPTKeluarController.fetchOne)
router.put('/:id', SPTKeluarController.editOne)
router.post('/new', SPTKeluarController.newSPT)
router.post('/book', SPTKeluarController.bookSPT)

// router.delete('/:id', SuratMasukController.deleteOne)

module.exports = router