const SuratMasukController = require('../controllers/SuratMasukController')
const UserController = require('../controllers/UserController')
const authentication = require('../middlewares/auth')
const router = require('express').Router()
const errorHandler = require('../middlewares/errorHandler')
const SuratMasukRouter = require('./suratMasukRoute')
const UndanganMasukRouter = require('./undanganMasukRoute')

router.get('/', (req, res) => {
    res.send('Hello World from router!')
})

// user login and register
router.post('/login', UserController.login)
router.post('/register', UserController.register)

router.use(authentication)

// surat masuk
router.use('/suratmasuk', SuratMasukRouter)

// undangan masuk
router.use('/undanganmasuk', UndanganMasukRouter)

router.use(errorHandler)

module.exports = router