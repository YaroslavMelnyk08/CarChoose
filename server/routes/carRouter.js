const Router = require('express')
const router = new Router()
const carController = require('../controllers/carController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), carController.create)
router.get('/', carController.getAll)

module.exports = router