const app = require('../app.js');
process.env.NODE_ENV = 'test';

const request = require('supertest');
const db = require('../db/index.js');
const { response } = require('../app.js');

describe('app', () => {
  afterAll(function () {
    return db.end();
  });
  describe('api/areas', () => {
    test('GET 200 - responds with status 200 and all areas', () => {
      return request(app)
        .get('/api/areas')
        .expect(200)
        .then((response) => {
          // assert that the response is in the correct shape
          expect(response.body).toMatchObject({ areas: expect.any(Array) });
          // expect(response.body.totalCount).toBe(5);
        });
    });
    test('POST 201 - responds with status 201 and a json object', () => {
      return request(app)
        .post('/api/areas')
        .send({ name: 'Endcliffe' })
        .set('Accept', 'application/json')
        .expect(201)
        .then((response) => {
          // assert that the response is in the correct shape
          expect(response.body).toHaveProperty('name', 'Endcliffe');
        });
    });
  });

  describe('api/areas/:area_id/restaurants', () => {
    test('GET 200 - responds with 200 and all restaurants in the given area', () => {
      return request(app)
        .get('/api/areas/1/restaurants')
        .expect(200)
        .then((response) => {
          console.log(response.body);
          expect(response.body.restaurantsByArea).toMatchObject({
            restaurants: expect.any(Array),
          });
          expect(response.body.restaurantsByArea).toHaveProperty('area_id', 1);
        });
    });

    test('GET 404 - responds with 404', () => {
      return request(app)
        .get('/api/areas/45678/restaurants')
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe('area not found');
        });
    });

    test('GET 200 - responds with restaurants in the given area_id and queried by cuisine', () => {
      return request(app)
        .get('/api/areas/1/restaurants?cuisine=Italian')
        .expect(200)
        .then((response) => {
          // console.log(response.body.restaurantsByArea, 'in test');
          expect(response.body.restaurantsByArea).toEqual({
            area_id: 1,
            name: 'Woodseats',
            total_restaurants: 1,
            restaurants: [
              {
                restaurant_id: 1,
                name: 'Marco',
                area_id: 1,
                cuisine: 'Italian',
                website:
                  'https://www.tripadvisor.co.uk/Restaurant_Review-g186364-d8065913-Reviews-Marco_s-Sheffield_South_Yorkshire_England.html',
              },
            ],
          });
          expect(response.body.restaurantsByArea).toMatchObject({
            restaurants: expect.any(Array),
          });
        });
    });

    test('GET 404 - responds with not found when there is no restaurant in the area serving the given cuisine', () => {
      return request(app)
        .get('/api/areas/1/restaurants?cuisine=Chicken')
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe('cuisine not found');
        });
    });
  });
});
