const restaurantsRouter = require('express').Router();
const {
  getCommentByRestaurantId,
  postCommentByRestaurantId,
  postRatingByRestaurantId,
} = require('../controllers/restaurants-controllers.js');

restaurantsRouter
  .route('/:restaurant_id/comments')
  .get(getCommentByRestaurantId)
  .post(postCommentByRestaurantId);

restaurantsRouter
  .route('/:restaurant_id/ratings')
  .post(postRatingByRestaurantId);

module.exports = restaurantsRouter;
