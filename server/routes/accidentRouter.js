const Router = require('express')
const router = new Router()
const accidentController = require('../controllers/accidentController')

router.get('/', accidentController.getAll)

module.exports = router