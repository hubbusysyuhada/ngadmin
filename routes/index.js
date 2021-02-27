const router = require('express').Router()
const inRouter = require('./inRoutes')
const outRouter = require('./outRoutes')
const MainController = require('../controllers/mainController')


router.get('/', MainController.home)
router.use('/in', inRouter)
router.use('/out', outRouter)

module.exports = router