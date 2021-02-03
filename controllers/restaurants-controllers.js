const {
  addCommentByRestaurantId,
  fetchCommentByRestaurantId,
  addRatingByRestaurantId,
} = require('../models/restaurants-models.js');

const postCommentByRestaurantId = (req, res, next) => {
  const { restaurant_id } = req.params;
  const { newComment } = req.body;
  newComment.restaurant_id = parseFloat(restaurant_id);

  addCommentByRestaurantId(newComment)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

const getCommentByRestaurantId = (req, res, next) => {
  const { restaurant_id } = req.params;
  fetchCommentByRestaurantId(restaurant_id)
    .then((restaurantComments) => {
      res.status(200).send({ restaurantComments });
    })
    .catch(next);
};

const postRatingByRestaurantId = (req, res, next) => {
  const { restaurant_id } = req.params;
  const rating = req.body;
  rating.restaurant_id = parseFloat(restaurant_id);
  addRatingByRestaurantId(rating)
    .then((rating) => {
      res.status(201).send({ rating });
    })
    .catch(next);
};

module.exports = {
  postCommentByRestaurantId,
  getCommentByRestaurantId,
  postRatingByRestaurantId,
};
