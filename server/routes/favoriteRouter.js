const Router = require('express');
const router = new Router();
const favoriteController = require('../controllers/FavoriteController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, favoriteController.addFavorite);
router.delete('/:id', authMiddleware, favoriteController.removeFavorite);
router.get('/:ConsumerId', authMiddleware, favoriteController.getFavoritesByConsumer);

module.exports = router;
