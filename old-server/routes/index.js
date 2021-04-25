const router = require('express').Router()
const inRouter = require('./inRoutes')
const outRouter = require('./outRoutes')
const { MainController, AccountController } = require('../controllers')
const session = require('../helpers/sessionAuth')


router.get('/', MainController.home)
router.get('/login', AccountController.login)
router.post('/login', AccountController.checkAccount)
router.get('/logout', AccountController.logout)
// router.use(session)
router.get('/register', AccountController.register)
router.post('/register', AccountController.storeAccount)
router.use('/in', inRouter)
router.use('/out', outRouter)

module.exports = router