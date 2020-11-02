const app = require('../app.js');
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
                .send({ areas: [ { area_id: 6, name: 'Endcliffe' } ] })
                .set('Accept', 'application/json')
                .expect(201)
                // .then((response) => {
                //     // assert that the response is in the correct shape
                //     expect(response.body).toMatchObject({ areas: expect.any(Array) })
                //     expect(response.body.totalCount).toBe(5);
                // })
        })
       
    })
    
       

})