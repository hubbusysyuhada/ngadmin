const router = require('express').Router()
const inRouter = require('./inRoutes')
const outRouter = require('./outRoutes')
const { MainController, SessionController } = require('../controllers')
const session = require('../helpers/sessionAuth')


router.get('/', MainController.home)
router.get('/login', SessionController.login)
router.post('/login', SessionController.checkAccount)
router.get('/logout', SessionController.logout)
// router.use(session)
router.get('/register', SessionController.register)
router.post('/register', SessionController.storeAccount)
router.use('/in', inRouter)
router.use('/out', outRouter)

module.exports = router