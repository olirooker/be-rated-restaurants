const { response } = require('express');
const {
  fetchAreas,
  addAreas,
  fetchRestaurantsByAreaId,
  addRestaurantByAreaId,
} = require('../models/areas-models.js');

const getAreas = (req, res, next) => {
  fetchAreas().then((areas) => {
    Promise.all([areas.rows, areas.rowCount])
      .then(([areas, totalCount]) => {
        res.send({ areas, totalCount });
      })
      .catch(next);
  });
};

const postAreas = (req, res, next) => {
  const newArea = req.body;

  addAreas(newArea)
    .then((area) => {
      res.status(201).send(area);
    })
    .catch(next);
};

const getRestaurantsByAreaId = (req, res, next) => {
  const { area_id } = req.params;
  const { cuisine } = req.query;

  fetchRestaurantsByAreaId(area_id, cuisine)
    .then((restaurantsByArea) => {
      res.status(200).send({ restaurantsByArea });
    })
    .catch(next);
};

const postRestaurantByAreaId = (req, res, next) => {
  const { area_id } = req.params;
  const { newRestaurant } = req.body;
  newRestaurant.area_id = parseFloat(area_id);

  addRestaurantByAreaId(newRestaurant)
    .then((restaurant) => {
      res.status(201).send({ restaurant });
    })
    .catch(next);
};

module.exports = {
  getAreas,
  postAreas,
  getRestaurantsByAreaId,
  postRestaurantByAreaId,
};
