const db = require('../db/index.js');

const fetchAreas = () => {
  return db.query('SELECT * FROM area').then((areas) => {
    return areas;
  });
};

const addAreas = (newArea) => {
  return db
    .query('INSERT INTO area (name) VALUES ($1) RETURNING *', [newArea.name])
    .then((updatedArea) => {
      return updatedArea.rows[0];
    });
};

const fetchRestaurantsByAreaId = (areaId) => {
  // join the area table and the restaurant table

  const areas = db
    .query('SELECT * FROM area WHERE area_id = $1', [areaId])
    .then((response) => {
      return response.rows;
    })
    .then((response) => {
      console.log(response);
      if (Object.values(response).length === 0) {
        return Promise.reject({ status: 404, msg: 'area not found' });
      }
      return response[0];
    });

  const restaurants = db
    .query('SELECT * FROM restaurants WHERE restaurants.area_id = $1', [areaId])
    .then((response) => {
      return response.rows;
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

module.exports = { fetchAreas, addAreas, fetchRestaurantsByAreaId };
