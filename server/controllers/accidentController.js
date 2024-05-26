const {Accident} = require('../models/models')

class AccidentController {

    async getAll(req, res) {
        const accidents = await Accident.findAll()
        return res.json(accidents)
    }
}

module.exports = new AccidentController()