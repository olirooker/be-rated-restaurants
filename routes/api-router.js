const apiRouter = require('express').Router();
const areasRouter = require('./areas-router.js');
const restaurantsRouter = require('./restaurants-router.js');

apiRouter.use('/areas', areasRouter);
apiRouter.use('/restaurants', restaurantsRouter);

module.exports = apiRouter;
