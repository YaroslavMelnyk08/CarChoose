const uuid = require('uuid')
const path = require('path')
const {Ad} = require('../models/models')
const ApiError = require('../error/ApiError')

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
            next(ApiError.badRequest(e.message));
        }
    }


    // 50 хв
    async getAll(req, res) {
        let {
            CarId,
            PaintConditionId,
            ColorId,
            AccidentId,
            DrivenFromId,
            limit,
            page
        } = req.query;
    
        page = page || 1;
        limit = limit || 16;
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
        const {id} = req.params
        const ad = await Ad.findOne(
            {where: {id}}
        )

        return res.json(ad)
    }
}

module.exports = new AdController()