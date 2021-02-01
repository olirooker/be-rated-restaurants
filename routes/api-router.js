const apiRouter = require('express').Router();
const areasRouter = require('./areas-router.js');

apiRouter.use('/areas', areasRouter);

module.exports = apiRouter;
