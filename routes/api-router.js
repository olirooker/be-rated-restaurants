const apiRouter = require('express').Router();
const areasRouter = require('./areas-router.js');
const restaurantsRouter = require('./restaurants-router.js');
const { send405 } = require('../controllers/errors-controllers.js');

apiRouter.route('/').all(send405);
apiRouter.use('/areas', areasRouter);
apiRouter.use('/restaurants', restaurantsRouter);

module.exports = apiRouter;
