const areasRouter = require('express').Router();
const {
  getAreas,
  postAreas,
  getRestaurantsByAreaId,
  postRestaurantByAreaId,
} = require('../controllers/areas-controllers.js');

areasRouter.route('/').get(getAreas).post(postAreas);

areasRouter
  .route('/:area_id/restaurants')
  .get(getRestaurantsByAreaId)
  .post(postRestaurantByAreaId);

module.exports = areasRouter;
