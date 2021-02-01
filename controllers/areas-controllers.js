const { response } = require('express');
const {
  fetchAreas,
  addAreas,
  fetchRestaurantsByAreaId,
} = require('../models/areas-models.js');

const getAreas = (req, res, next) => {
  fetchAreas().then((areas) => {
    Promise.all([areas.rows, areas.rowCount])
      .then(([areas, totalCount]) => {
        res.send({ areas, totalCount });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const postAreas = (req, res, next) => {
  const newArea = req.body;
  addAreas(newArea).then((area) => {
    res.status(201).send(area);
  });
};

const getRestaurantsByAreaId = (req, res, next) => {
  const { area_id } = req.params;
  const { cuisine } = req.query;

  fetchRestaurantsByAreaId(area_id, cuisine)
    .then((restaurantsByArea) => {
      res.status(200).send({ restaurantsByArea });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getAreas, postAreas, getRestaurantsByAreaId };
