const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Consumer, Ad} = require('../models/models')

const generateJwt = (id, first_name, last_name, patronymic, email, phone_number, role) => {
    return jwt.sign({id, first_name, last_name, patronymic, email, phone_number, role}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class UserController {
    async registration(req, res, next) {
        const {first_name, last_name, patronymic, email, phone_number, password, role} = req.body
        if (!first_name || !last_name || !patronymic || !email || !phone_number || !password) {
            return next(ApiError.badRequest('Заповніть поля'))
        }
        const candidate = await Consumer.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Користувач із таким e-mail уже існує'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const consumer = await Consumer.create({first_name, last_name, patronymic, email, phone_number, password: hashPassword, role})
        const token = generateJwt(consumer.id, consumer.first_name, consumer.last_name, consumer.patronymic, consumer.email, consumer.phone_number, consumer.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const consumer = await Consumer.findOne({where: {email}})
        if (!consumer) {
            return next(ApiError.internal('Користувач із таким e-mail не зареєстрований'))
        }
        let comparePassword = bcrypt.compareSync(password, consumer.password)
        if(!comparePassword) {
            return next(ApiError.internal('Неправильний пароль'))
        }
        const token = generateJwt(consumer.id, consumer.first_name, consumer.last_name, consumer.patronymic, consumer.email, consumer.phone_number, consumer.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.consumer.id, req.consumer.first_name, req.consumer.last_name, req.consumer.patronymic, req.consumer.email, req.consumer.phone_number, req.consumer.role)
        return res.json({token})
    }
}

module.exports = new UserController()