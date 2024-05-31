const { Ad, Consumer, PaintCondition, Color, Accident, DrivenFrom, Car } = require('../models/models');
const ApiError = require('../error/ApiError')
const uuid = require('uuid');
const path = require('path');

class AdController {
    async create(req, res, next) {
        try {
            const { title, description, year_of_manufacture, mileage, price, ConsumerId, CarId, PaintConditionId, ColorId, AccidentId, DrivenFromId } = req.body;
            const { photo } = req.files;

            let fileName = uuid.v4() + ".jpg";
            photo.mv(path.resolve(__dirname, '..', 'static', fileName));

            const ad = await Ad.create({ title, description, year_of_manufacture, mileage, price, ConsumerId, CarId, PaintConditionId, ColorId, AccidentId, DrivenFromId, photo: fileName });

            return res.json(ad);
        } catch (e) {
            console.log(e); 
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let { CarId, PaintConditionId, ColorId, AccidentId, DrivenFromId, limit, page } = req.query;

        page = page || 1;
        limit = limit || 2;
        let offset = page * limit - limit;

        let whereClause = {};

        if (CarId) whereClause.CarId = CarId;
        if (PaintConditionId) whereClause.PaintConditionId = PaintConditionId;
        if (ColorId) whereClause.ColorId = ColorId;
        if (AccidentId) whereClause.AccidentId = AccidentId;
        if (DrivenFromId) whereClause.DrivenFromId = DrivenFromId;

        let ads = await Ad.findAndCountAll({
            where: whereClause,
            limit,
            offset
        });

        return res.json(ads);
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
                { model: Car, attributes: ['generation', 'trim', 'engine_type', 'capacity_cm3', 'engine_hp', 'drive_wheels', 'transmission']}
            ]
        });

        return res.json(ad);
    }
}

module.exports = new AdController();