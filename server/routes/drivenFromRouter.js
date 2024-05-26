const Router = require('express')
const router = new Router()
const drivenFromController = require('../controllers/drivenFromController')

router.get('/', drivenFromController.getAll)

module.exports = router