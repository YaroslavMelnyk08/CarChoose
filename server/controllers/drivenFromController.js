const {DrivenFrom} = require('../models/models')

class DrivenFromController {

    async getAll(req, res) {
        const drivenFrom = await DrivenFrom.findAll()
        return res.json(drivenFrom)
    }
}

module.exports = new DrivenFromController()