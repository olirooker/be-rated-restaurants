const { response } = require('express');
const db = require('../db/index.js');

const fetchAreas = () => {
  return db.query('SELECT * FROM area').then((areas) => {
    return areas;
  });
};

const addAreas = (newArea) => {
  if (typeof newArea.name !== 'string' || !newArea.name) {
    return Promise.reject({ status: 400, msg: 'Bad request' });
  } else {
    return db
      .query('INSERT INTO area (name) VALUES ($1) RETURNING *', [newArea.name])
      .then((updatedArea) => {
        return updatedArea.rows[0];
      });
  }
};

const fetchRestaurantsByAreaId = (areaId, cuisine) => {
  // join the area table and the restaurant table
  const areas = db
    .query('SELECT * FROM area WHERE area_id = $1', [areaId])
    .then((response) => {
      return response.rows;
    })
    .then((response) => {
      if (Object.values(response).length === 0) {
        return Promise.reject({ status: 404, msg: 'area not found' });
      }
      return response[0];
    });

  const restaurants = db
    .query('SELECT * FROM restaurants WHERE restaurants.area_id = $1', [areaId])
    .then((response) => {
      if (cuisine) {
        return response.rows.filter((restaurant) => {
          return restaurant.cuisine === cuisine;
        });
      } else {
        return response.rows;
      }
      // find a way to make a conditional query within the .query -
      // something like .query('SELECT * FROM restaurants WHERE restaurants.area_id = $1' AND restaurants.cuisine = $2, [areaId, cuisine]
    })
    .then((response) => {
      if (Object.values(response).length === 0) {
        return Promise.reject({ status: 404, msg: 'cuisine not found' });
      }
      return response;
    });

  const restaurantCount = db
    .query('SELECT * FROM restaurants WHERE restaurants.area_id = $1', [areaId])
    .then((response) => {
      return response.rowCount;
    });

  return Promise.all([areas, restaurantCount, restaurants]).then((response) => {
    const newObj = {
      area_id: response[0].area_id,
      name: response[0].name,
      total_restaurants: response[1],
      restaurants: response[2],
    };
    return newObj;
  });
};

const addRestaurantByAreaId = (newRestaurant) => {
  const values = Object.values(newRestaurant);

  for (let value of values) {
    if (typeof value !== 'string' || !value) {
      return Promise.reject({ status: 400, msg: 'Bad request' });
    }
  }

  return db
    .query(
      'INSERT INTO restaurants(name, area_id, cuisine, website) VALUES ($1, $2, $3, $4) RETURNING *',
      [
        newRestaurant.name,
        newRestaurant.area_id,
        newRestaurant.cuisine,
        newRestaurant.website,
      ]
    )
    .then((restaurant) => {
      return restaurant.rows[0];
    });
};

module.exports = {
  fetchAreas,
  addAreas,
  fetchRestaurantsByAreaId,
  addRestaurantByAreaId,
};
