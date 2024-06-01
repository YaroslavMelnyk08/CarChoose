const { Ad, Consumer, PaintCondition, Color, Accident, DrivenFrom, Car, AdPhoto } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class AdController {
    async create(req, res, next) {
        try {
            const { title, description, year_of_manufacture, mileage, price, make, model, ConsumerId, CarId, PaintConditionId, ColorId, AccidentId, DrivenFromId } = req.body;
            const { photos } = req.files;

            let ad = await Ad.create({ title, description, year_of_manufacture, mileage, price, make, model, ConsumerId, CarId, PaintConditionId, ColorId, AccidentId, DrivenFromId });

            if (photos) {
                if (Array.isArray(photos)) {
                    for (let photo of photos) {
                        let fileName = uuid.v4() + ".jpg";
                        photo.mv(path.resolve(__dirname, '..', 'static', fileName));
                        await AdPhoto.create({ file_name: fileName, AdId: ad.id });
                    }
                } else {
                    let fileName = uuid.v4() + ".jpg";
                    photos.mv(path.resolve(__dirname, '..', 'static', fileName));
                    await AdPhoto.create({ file_name: fileName, AdId: ad.id });
                }
            }

            return res.json(ad);
        } catch (e) {
            console.log(e); 
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let { make, model, PaintConditionId, ColorId, AccidentId, DrivenFromId, limit, page } = req.query;

        page = page || 1;
        limit = limit || 2;
        let offset = page * limit - limit;

        let whereClause = {};

        if (make) whereClause.make = make;
        if (model) whereClause.model = model;
        if (PaintConditionId) whereClause.PaintConditionId = PaintConditionId;
        if (ColorId) whereClause.ColorId = ColorId;
        if (AccidentId) whereClause.AccidentId = AccidentId;
        if (DrivenFromId) whereClause.DrivenFromId = DrivenFromId;

        try {
            let ads = await Ad.findAndCountAll({
                where: whereClause,
                limit,
                offset,
                include: [AdPhoto]
            });

            return res.json(ads);
        } catch (error) {
            console.error("Error fetching ads:", error.message);
            return res.status(500).json({ error: "Error fetching ads" });
        }
    }

    async getOne(req, res) {
        const { id } = req.params;
        const ad = await Ad.findOne({
            where: { id },
            include: [
                { model: Consumer, attributes: ['first_name', 'last_name', 'phone_number'] },
                { model: PaintCondition, attributes: ['paint_condition_name', 'paint_condition_description'] },
                { model: Color, attributes: ['color_name'] },
                { model: Accident, attributes: ['accident_name'] },
                { model: DrivenFrom, attributes: ['country_name'] },
                { model: Car, attributes: ['generation', 'trim', 'engine_type', 'capacity_cm3', 'engine_hp', 'drive_wheels', 'transmission'] },
                { model: AdPhoto }
            ]
        });

        return res.json(ad);
    }

    async getAdsByConsumer(req, res) {
        const { id } = req.params;
        const ads = await Ad.findAll({ where: { ConsumerId: id }, include: [AdPhoto] });
        return res.json(ads);
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { title, description, year_of_manufacture, mileage, price, make, model } = req.body;
    
            const [updatedRowsCount] = await Ad.update(
                { title, description, year_of_manufacture, mileage, price, make, model },
                { where: { id } }
            );
    
            if (updatedRowsCount === 0) {
                return res.status(404).json({ error: `Ad with id ${id} not found` });
            }

            const updatedAd = await Ad.findByPk(id);
    
            return res.json(updatedAd);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deletedAd = await Ad.destroy({ where: { id } });
            
            if (!deletedAd) {
                return res.status(404).json({ error: `Ad with id ${id} not found` });
            }
    
            return res.json({ message: 'Ad deleted successfully' });
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }    
}

module.exports = new AdController();
