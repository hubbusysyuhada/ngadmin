const UndanganMasukController = require('../controllers/UndanganMasukController')
const router = require('express').Router()

console.log('undangan masuk route');

// surat masuk
router.get('/', UndanganMasukController.fetchAll)
router.get('/:id', UndanganMasukController.fetchOne)
router.put('/:id', UndanganMasukController.editOne)
router.post('/new', UndanganMasukController.newUndanganMasuk)
// router.delete('/:id', UndanganMasukController.deleteOne)

module.exports = router