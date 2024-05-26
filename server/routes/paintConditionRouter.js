const Router = require('express')
const router = new Router()
const paintConditionController = require('../controllers/paintConditionController')

router.get('/', paintConditionController.getAll)

module.exports = router