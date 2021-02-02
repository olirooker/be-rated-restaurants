const restaurantsRouter = require('express').Router();
const {
  postCommentByRestaurantId,
} = require('../controllers/restaurants-controllers.js');

restaurantsRouter
  .route('/:restaurant_id/comments')
  .post(postCommentByRestaurantId);

module.exports = restaurantsRouter;
