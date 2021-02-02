const db = require('../db/index.js');

const addCommentByRestaurantId = (newComment) => {
  return db
    .query(
      'INSERT INTO comments(restaurant_id, body) VALUES ($1, $2) RETURNING *',
      [newComment.restaurant_id, newComment.body]
    )
    .then((comment) => {
      return comment.rows[0];
    });
};

module.exports = { addCommentByRestaurantId };
