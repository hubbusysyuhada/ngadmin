const UserController = require('../controllers/UserController')
const authentication = require('../middlewares/auth')
const router = require('express').Router()
const errorHandler = require('../middlewares/errorHandler')
const SuratMasukRouter = require('./suratMasukRoute')
const UndanganMasukRouter = require('./undanganMasukRoute')
const SPTRouter = require('./SPTKeluarRouter')
const SuratKeluarRouter = require('./SuratKeluarRouter')

router.get('/', (req, res) => {
    res.send('Hello World from router!')
})

// user login and register
router.post('/login', UserController.login)
router.post('/register', UserController.register)

router.use(authentication)
router.get('/user', UserController.getAllUsers)
// surat masuk
router.use('/suratmasuk', SuratMasukRouter)

// undangan masuk
router.use('/undanganmasuk', UndanganMasukRouter)

// SPT keluar
router.use('/spt', SPTRouter)

// surat keluar
router.use('/suratkeluar', SuratKeluarRouter)

router.use(errorHandler)

module.exports = router