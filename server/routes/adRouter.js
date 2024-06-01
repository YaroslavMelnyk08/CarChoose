const Router = require('express')
const router = new Router()
const adController = require('../controllers/adController')
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', adController.create)
router.get('/', adController.getAll)
router.get('/:id', adController.getOne)
router.get('/consumer/:id', adController.getAdsByConsumer);
router.put('/:id', adController.update);

module.exports = router