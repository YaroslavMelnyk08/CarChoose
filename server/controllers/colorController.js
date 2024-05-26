const {Color} = require('../models/models')

class ColorController {

    async getAll(req, res) {
        const colors = await Color.findAll()
        return res.json(colors)
    }
}

module.exports = new ColorController()