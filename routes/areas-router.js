const areasRouter = require('express').Router();
const { getAreas } = require('../controllers/areas-controllers.js')

areasRouter.route("/").get(getAreas)

module.exports = areasRouter;