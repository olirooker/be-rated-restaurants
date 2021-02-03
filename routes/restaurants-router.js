const restaurantsRouter = require('express').Router();
const {
  getCommentByRestaurantId,
  postCommentByRestaurantId,
  getRatingByRestaurantId,
  postRatingByRestaurantId,
} = require('../controllers/restaurants-controllers.js');
const { send405 } = require('../controllers/errors-controllers.js');

restaurantsRouter
  .route('/:restaurant_id/comments')
  .get(getCommentByRestaurantId)
  .post(postCommentByRestaurantId)
  .all(send405);

restaurantsRouter
  .route('/:restaurant_id/ratings')
  .get(getRatingByRestaurantId)
  .post(postRatingByRestaurantId)
  .all(send405);

module.exports = restaurantsRouter;
