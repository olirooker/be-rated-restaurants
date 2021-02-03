const areasRouter = require('express').Router();
const {
  getAreas,
  postAreas,
  getRestaurantsByAreaId,
  postRestaurantByAreaId,
} = require('../controllers/areas-controllers.js');
const { send405 } = require('../controllers/errors-controllers.js');

areasRouter.route('/').get(getAreas).post(postAreas).all(send405);

areasRouter
  .route('/:area_id/restaurants')
  .get(getRestaurantsByAreaId)
  .post(postRestaurantByAreaId)
  .all(send405);

module.exports = areasRouter;
