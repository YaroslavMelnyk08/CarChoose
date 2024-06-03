const Router = require('express')
const router = new Router()
const adRouter = require('./adRouter')
const carRouter = require('./carRouter')
const userRouter = require('./userRouter')
const paintConditionRouter = require('./paintConditionRouter')
const colorRouter = require('./colorRouter')
const accidentRouter = require('./accidentRouter')
const drivenFromRouter = require('./drivenFromRouter')
const favoriteRouter = require('./favoriteRouter');

router.use('/user', userRouter)
router.use('/ad', adRouter)
router.use('/car', carRouter)
router.use('/paintCondition', paintConditionRouter)
router.use('/color', colorRouter)
router.use('/accident', accidentRouter)
router.use('/drivenFrom', drivenFromRouter)
router.use('/favorite', favoriteRouter);

module.exports = router