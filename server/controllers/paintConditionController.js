const {PaintCondition} = require('../models/models')

class PaintConditionController {

    async getAll(req, res) {
        const paintConditions = await PaintCondition.findAll()
        return res.json(paintConditions)
    }
}

module.exports = new PaintConditionController()