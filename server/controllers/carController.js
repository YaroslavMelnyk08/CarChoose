const {Car} = require('../models/models')
const ApiError = require('../error/ApiError')

class CarController {
    async create(req, res) {
        const {car_id, make, model, generation, year_from, year_to, series, trim, body_type, number_of_seats, engine_type, capacity_cm3, engine_hp, drive_wheels, number_of_gears, transmission} = req.body
        const car = await Car.create({car_id, make, model, generation, year_from, year_to, series, trim, body_type, number_of_seats, engine_type, capacity_cm3, engine_hp, drive_wheels, number_of_gears, transmission})
        return res.json({car_id, make, model, generation, year_from, year_to, series, trim, body_type, number_of_seats, engine_type, capacity_cm3, engine_hp, drive_wheels, number_of_gears, transmission})
    }

    async getAll(req, res) {
        const cars = await Car.findAll()
        return res.json(cars)
    }
}

module.exports = new CarController()