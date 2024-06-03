const { Favorite, Ad, Consumer } = require('../models/models');
const ApiError = require('../error/ApiError');

class FavoriteController {
    async addFavorite(req, res, next) {
        try {
            const { ConsumerId, AdId } = req.body;
            const favorite = await Favorite.create({ ConsumerId, AdId });
            return res.json(favorite);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async removeFavorite(req, res, next) {
        try {
            const { id } = req.params;
            const favorite = await Favorite.destroy({ where: { id } });
            if (!favorite) {
                return res.status(404).json({ error: `Favorite with id ${id} not found` });
            }
            return res.json({ message: 'Favorite removed successfully' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getFavoritesByConsumer(req, res) {
        try {
            const { ConsumerId } = req.params;
            const favorites = await Favorite.findAll({
                where: { ConsumerId },
                include: [Ad]
            });
            return res.json(favorites);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}

module.exports = new FavoriteController();