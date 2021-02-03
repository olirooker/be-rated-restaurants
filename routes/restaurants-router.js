const restaurantsRouter = require('express').Router();
const {
  getCommentByRestaurantId,
  postCommentByRestaurantId,
  getRatingByRestaurantId,
  postRatingByRestaurantId,
} = require('../controllers/restaurants-controllers.js');

restaurantsRouter
  .route('/:restaurant_id/comments')
  .get(getCommentByRestaurantId)
  .post(postCommentByRestaurantId);

restaurantsRouter
  .route('/:restaurant_id/ratings')
  .get(getRatingByRestaurantId)
  .post(postRatingByRestaurantId);

module.exports = restaurantsRouter;
