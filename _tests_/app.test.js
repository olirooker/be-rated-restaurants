const app = require('../app.js');
process.env.NODE_ENV = 'test';

const request = require('supertest');
const db = require('../db/index.js');
const { response } = require('../app.js');

describe('app', () => {
    afterAll(function () {
        return db.end();
    })
    describe('/areas', () => {
        test('Get responds with status 200 and all areas', () => {
            return request(app)
                .get('/api/areas')
                .expect(200)
                .then((response) => {
                    // assert that the response is in the correct shape
                    expect(response.body).toMatchObject({ areas: expect.any(Array) })
                    // expect(response.body.totalCount).toBe(5);
                })
        })
        test('POST responds with status 201 and a json object', () => {
            return request(app)
                .post('/api/areas')
                .send({ name: 'Endcliffe' })
                .set('Accept', 'application/json')
                .expect(201)
                .then((response) => {
                    // assert that the response is in the correct shape
                    expect(response.body).toHaveProperty('name', 'Endcliffe')
                })
        })
    })

    describe('/areas/:area_id/restaurants', () => {
        test('get responds with 200 and all restaurants in the given area', () => {
            return request(app)
                .get('/api/areas/1/restaurants')
                .expect(200)
                .then((response) => {
                    expect(response.body.restaurantsByArea).toMatchObject({ restaurants: expect.any(Array) })
                    expect(response.body.restaurantsByArea).toHaveProperty("area_id", 1);
                })
        })

        test('get responds with 404', () => {
            return request(app)
                .get('/api/areas/45678/restaurants')
                .expect(404)
                .then((response) => {
                    // console.log(response, '<---- test')
                    expect(response.status).toBe(404);
                    expect(response.body.msg).toBe('area not found')
                })
        })
    })

})