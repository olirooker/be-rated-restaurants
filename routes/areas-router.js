const areasRouter = require('express').Router();
const {
  getAreas,
  postAreas,
  getRestaurantsByAreaId,
} = require('../controllers/areas-controllers.js');

areasRouter.route('/').get(getAreas).post(postAreas);

areasRouter.route('/:area_id/restaurants').get(getRestaurantsByAreaId);

module.exports = areasRouter;
