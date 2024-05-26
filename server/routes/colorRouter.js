const Router = require('express')
const router = new Router()
const colorController = require('../controllers/colorController')

router.get('/', colorController.getAll)

module.exports = router