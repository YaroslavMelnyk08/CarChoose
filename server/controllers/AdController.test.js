const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { Ad } = require('../models/models');
const ApiError = require('../error/ApiError');
const AdController = require('../controllers/adController');

jest.mock('../models/models');
jest.mock('uuid', () => ({
    v4: jest.fn(() => 'unique-uuid')
}));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/ad', (req, res, next) => AdController.create(req, res, next));
app.get('/ad', (req, res) => AdController.getAll(req, res));
app.get('/ad/:id', (req, res) => AdController.getOne(req, res));

describe('AdController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new ad and return it', async () => {
            const adData = {
                title: 'Test Title', description: 'Test Description', year_of_manufacture: 2020, mileage: 10000, price: 10000, ConsumerId: 1, CarId: 1, PaintConditionId: 1, ColorId: 1, AccidentId: 1, DrivenFromId: 1, photo: 'unique-uuid.jpg'
            };
            Ad.create.mockResolvedValue(adData);

            const response = await request(app)
                .post('/ad')
                .field('title', 'Test Title')
                .field('description', 'Test Description')
                .field('year_of_manufacture', 2020)
                .field('mileage', 10000)
                .field('price', 10000)
                .field('ConsumerId', 1)
                .field('CarId', 1)
                .field('PaintConditionId', 1)
                .field('ColorId', 1)
                .field('AccidentId', 1)
                .field('DrivenFromId', 1)
                .attach('photo', Buffer.from('file content'), 'photo.jpg');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(adData);
            expect(Ad.create).toHaveBeenCalledWith(expect.objectContaining({
                title: 'Test Title', description: 'Test Description', year_of_manufacture: 2020, mileage: 10000, price: 10000, ConsumerId: 1, CarId: 1, PaintConditionId: 1, ColorId: 1, AccidentId: 1, DrivenFromId: 1, photo: 'unique-uuid.jpg'
            }));
        });

        it('should handle errors', async () => {
            const error = new Error('Test Error');
            Ad.create.mockRejectedValue(error);

            const response = await request(app)
                .post('/ad')
                .field('title', 'Test Title')
                .field('description', 'Test Description');

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Test Error');
        });
    });

    describe('getAll', () => {
        it('should return ads with pagination and filters', async () => {
            const adsData = { rows: [{ id: 1, title: 'Test Ad' }], count: 1 };
            Ad.findAndCountAll.mockResolvedValue(adsData);

            const response = await request(app)
                .get('/ad')
                .query({
                    CarId: 1,
                    PaintConditionId: 1,
                    ColorId: 1,
                    AccidentId: 1,
                    DrivenFromId: 1,
                    limit: 10,
                    page: 1
                });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(adsData);
            expect(Ad.findAndCountAll).toHaveBeenCalledWith({
                where: {
                    CarId: 1,
                    PaintConditionId: 1,
                    ColorId: 1,
                    AccidentId: 1,
                    DrivenFromId: 1
                },
                limit: 10,
                offset: 0
            });
        });
    });

    describe('getOne', () => {
        it('should return a single ad by id', async () => {
            const adData = { id: 1, title: 'Test Ad' };
            Ad.findOne.mockResolvedValue(adData);

            const response = await request(app).get('/ad/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(adData);
            expect(Ad.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });
    });
});
