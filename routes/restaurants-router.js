const restaurantsRouter = require('express').Router();
const {
  getCommentByRestaurantId,
  postCommentByRestaurantId,
} = require('../controllers/restaurants-controllers.js');

restaurantsRouter
  .route('/:restaurant_id/comments')
  .get(getCommentByRestaurantId)
  .post(postCommentByRestaurantId);

module.exports = restaurantsRouter;
