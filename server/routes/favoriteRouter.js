const Router = require('express');
const router = new Router();
const favoriteController = require('../controllers/FavoriteController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', favoriteController.addFavorite);
router.delete('/:id', favoriteController.removeFavorite);
router.get('/:ConsumerId', favoriteController.getFavoritesByConsumer);

module.exports = router;
