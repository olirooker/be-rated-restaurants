const areasRouter = require('express').Router();
const { getAreas, postAreas } = require('../controllers/areas-controllers.js')

areasRouter.route("/")
    .get(getAreas)
    .post(postAreas)

module.exports = areasRouter;