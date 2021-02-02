const { addCommentByRestaurantId } = require('../models/restaurants-models.js');

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

module.exports = { postCommentByRestaurantId };
