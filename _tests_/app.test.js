const app = require('../app.js');
process.env.NODE_ENV = 'test';

const request = require('supertest');
const db = require('../db/index.js');

describe('app', () => {
  afterAll(function () {
    return db.end();
  });
  describe('/api/areas', () => {
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

    test('POST 400 - responds with bad request message for an incorrect data type', () => {
      return request(app)
        .post('/api/areas')
        .send({ name: true })
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe('Bad request');
        });
    });

    test('POST 400 - responds with bad request message for undefined data on key', () => {
      return request(app)
        .post('/api/areas')
        .send({ name: null })
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          console.log(response.body.msg);
          expect(response.body.msg).toBe('Bad request');
        });
    });

    test('POST 400 - responds with bad request message for empty string on key', () => {
      return request(app)
        .post('/api/areas')
        .send({ name: '' })
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe('Bad request');
        });
    });
  });

  describe('/api/areas/:area_id/restaurants', () => {
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

    test('POST 201 - accepts a new restaurant object and responds with the posted restaurant', () => {
      newRestaurant = {
        name: 'Delhi 2 Go',
        cuisine: 'Indian',
        website: 'https://www.dheli-2-g-.com',
      };

      return request(app)
        .post('/api/areas/2/restaurants')
        .send({ newRestaurant })
        .set('Accept', 'application/json')
        .expect(201)
        .then((response) => {
          expect(response.body.restaurant).toEqual({
            restaurant_id: 3,
            name: 'Delhi 2 Go',
            area_id: 2,
            cuisine: 'Indian',
            website: 'https://www.dheli-2-g-.com',
          });
        });
    });

    test('POST 400 - responds with bad request message for any incorrect data type on the request', () => {
      newRestaurant = {
        name: 'The Greedy Greek',
        cuisine: 'Greek',
        website: true,
      };

      return request(app)
        .post('/api/areas/2/restaurants')
        .send({ newRestaurant })
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe('Bad request');
        });
    });

    test('POST 400 - responds with bad request message for any undefined data on the request', () => {
      newRestaurant = {
        name: 'Two Steps',
        cuisine: 'Fish and Chips',
        website: null,
      };

      return request(app)
        .post('/api/areas/2/restaurants')
        .send({ newRestaurant })
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe('Bad request');
        });
    });

    test('POST 400 - responds with bad request message for any empty string on the request', () => {
      newRestaurant = {
        name: '',
        cuisine: 'Chicken',
        website: 'www.chicken.com',
      };

      return request(app)
        .post('/api/areas/2/restaurants')
        .send({ newRestaurant })
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe('Bad request');
        });
    });
  });

  describe('/api/restaurants/:restaurant_id/comments', () => {
    test('POST 201 - accepts a new comment object and returns the comment object', () => {
      newComment = {
        body: 'What a place! Delicious food and even better service!',
      };

      return request(app)
        .post('/api/restaurants/1/comments')
        .send({ newComment })
        .set('Accept', 'application/json')
        .expect(201)
        .then((response) => {
          expect(response.body.comment).toHaveProperty('comment_id', 3);
          expect(response.body.comment).toHaveProperty('restaurant_id', 1);
          expect(response.body.comment).toHaveProperty(
            'body',
            'What a place! Delicious food and even better service!'
          );
          expect(response.body.comment).toHaveProperty('created_at');
        });
    });

    test('POST 400 - responds with bad request message for an incorrect data type', () => {
      newComment = {
        body: true,
      };

      return request(app)
        .post('/api/restaurants/1/comments')
        .send({ newComment })
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe('Bad request');
        });
    });

    test('POST 400 - responds with bad request message for undefined data on key', () => {
      newComment = {
        body: null,
      };

      return request(app)
        .post('/api/restaurants/1/comments')
        .send({ newComment })
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          console.log(response.body.msg);
          expect(response.body.msg).toBe('Bad request');
        });
    });

    test('POST 400 - responds with bad request message for empty string on key', () => {
      newComment = {
        body: '',
      };

      return request(app)
        .post('/api/restaurants/1/comments')
        .send({ newComment })
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe('Bad request');
        });
    });

    test('GET 200 - responds with an array of comment objects for a given restaurant', () => {
      return request(app)
        .get('/api/restaurants/2/comments')
        .expect(200)
        .then((response) => {
          expect(Object.keys(response.body.restaurantComments)).toEqual(
            expect.objectContaining([
              'restaurant_id',
              'name',
              'area_id',
              'cuisine',
              'website',
              'total_comments',
            ])
          );
          expect(response.body.restaurantComments).toMatchObject({
            comments: expect.any(Object),
          });
        });
    });

    test('GET 404 - responds with not found if the restaurant_id does not exist', () => {
      return request(app)
        .get('/api/restaurants/99999/comments')
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe('restaurant not found');
        });
    });
  });

  describe('/api/restaurants/:restaurant_id/ratings', () => {
    test('POST 201 - accepts a new ratings object and returns the ratings object', () => {
      return request(app)
        .post('/api/restaurants/2/ratings')
        .send({ rating: 5 })
        .set('Accept', 'application/json')
        .expect(201)
        .then((response) => {
          expect(response.body.rating).toHaveProperty('rating_id', 3);
          expect(response.body.rating).toHaveProperty('restaurant_id', 2);
          expect(response.body.rating).toHaveProperty('rating', 5);
          expect(response.body.rating).toHaveProperty('created_at');
        });
    });

    test('POST 400 - responds with bad request for a rating over 5', () => {
      return request(app)
        .post('/api/restaurants/2/ratings')
        .send({ rating: 6 })
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe('Bad request');
        });
    });

    test('POST 400 - responds with bad request message for an incorrect data type', () => {
      return request(app)
        .post('/api/restaurants/2/ratings')
        .send({ rating: true })
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe('Bad request');
        });
    });

    test('POST 400 - responds with bad request message for undefined data on key', () => {
      return request(app)
        .post('/api/restaurants/2/ratings')
        .send({ rating: null })
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          console.log(response.body.msg);
          expect(response.body.msg).toBe('Bad request');
        });
    });

    test('POST 404 - accepts a new ratings object and returns the ratings object', () => {
      return request(app)
        .post('/api/restaurants/22254/ratings')
        .send({ rating: 5 })
        .set('Accept', 'application/json')
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe('Not found');
        });
    });

    test('GET 200 - responds with a ratings object with the correct key/value pairs for a given restaurant', () => {
      return request(app)
        .get('/api/restaurants/1/ratings')
        .expect(200)
        .then((response) => {
          expect(Object.keys(response.body.restaurantRating)).toEqual(
            expect.objectContaining([
              'restaurant_id',
              'area_id',
              'name',
              'cuisine',
              'website',
              'total_ratings',
            ])
          );
          expect(response.body.restaurantRating).toMatchObject({
            ratings: expect.any(Object),
          });
        });
    });

    test('GET 404 - responds with not found if the restaurant_id does not exist', () => {
      return request(app)
        .get('/api/restaurants/99999/ratings')
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe('restaurant not found');
        });
    });
  });

  describe('Error handling', () => {
    test('GET 404 - responds with 404 not found for non-existent routes', () => {
      return request(app)
        .get('/nope!')
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toEqual('Route not found!');
        });
    });

    test('405 /api/ - responds with 405 message for invalid methods', () => {
      const invalidMethods = ['get', 'post', 'delete', 'patch', 'put'];
      const requestPromises = invalidMethods.map((method) => {
        return request(app)
          [method]('/api/')
          .expect(405)
          .then((response) => {
            expect(response.body.msg).toBe('Method not allowed!');
          });
      });
      return Promise.all(requestPromises);
    });

    test('405 /api/areas - responds with 405 message for invalid methods', () => {
      const invalidMethods = ['delete', 'patch', 'put'];
      const requestPromises = invalidMethods.map((method) => {
        return request(app)
          [method]('/api/areas')
          .expect(405)
          .then((response) => {
            expect(response.body.msg).toBe('Method not allowed!');
          });
      });
      return Promise.all(requestPromises);
    });

    test('405 /api/areas/:area_id/restaurants - responds with 405 message for invalid methods', () => {
      const invalidMethods = ['delete', 'patch', 'put'];
      const requestPromises = invalidMethods.map((method) => {
        return request(app)
          [method]('/api/areas/1/restaurants')
          .expect(405)
          .then((response) => {
            expect(response.body.msg).toBe('Method not allowed!');
          });
      });
      return Promise.all(requestPromises);
    });

    test('405 /api/restaurants/restaurant_id/comments - responds with 405 message for invalid methods', () => {
      const invalidMethods = ['delete', 'patch', 'put'];
      const requestPromises = invalidMethods.map((method) => {
        return request(app)
          [method]('/api/restaurants/1/comments')
          .expect(405)
          .then((response) => {
            expect(response.body.msg).toBe('Method not allowed!');
          });
      });
      return Promise.all(requestPromises);
    });

    test('405 /api/restaurants/restaurant_id/ratings - responds with 405 message for invalid methods', () => {
      const invalidMethods = ['delete', 'patch', 'put'];
      const requestPromises = invalidMethods.map((method) => {
        return request(app)
          [method]('/api/restaurants/1/ratings')
          .expect(405)
          .then((response) => {
            expect(response.body.msg).toBe('Method not allowed!');
          });
      });
      return Promise.all(requestPromises);
    });
  });
});
