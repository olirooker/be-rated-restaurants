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

const fetchCommentByRestaurantId = (restaurant_id) => {
  const comments = db
    .query('SELECT * FROM comments WHERE restaurant_id = $1', [restaurant_id])
    .then((response) => {
      return response.rows;
    });

  const commentCount = db
    .query('SELECT * FROM comments WHERE restaurant_id = $1', [restaurant_id])
    .then((response) => {
      return response.rowCount;
    });

  const restaurant = db
    .query('SELECT * FROM restaurants WHERE restaurant_id = $1', [
      restaurant_id,
    ])
    .then((response) => {
      if (!response.rows.length) {
        return Promise.reject({ status: 404, msg: 'restaurant not found' });
      } else {
        return response.rows[0];
      }
    });
  return Promise.all([comments, commentCount, restaurant]).then((response) => {
    const commentObj = {
      restaurant_id: response[2].restaurant_id,
      name: response[2].name,
      area_id: response[2].area_id,
      cuisine: response[2].cuisine,
      website: response[2].website,
      total_comments: response[1],
      comments: response[0],
    };

    return commentObj;
  });
};

module.exports = { addCommentByRestaurantId, fetchCommentByRestaurantId };
