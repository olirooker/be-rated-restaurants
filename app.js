const express = require('express');
const {
  send404,
  handlePSQLErrors,
  handleCustomErrors,
  handleInternalErrors,
} = require('./controllers/errors-controllers.js');
const app = express();
const apiRouter = require('./routes/api-router.js');

app.use(express.json());
app.use('/api', apiRouter);
app.all('/*', send404);

// error-handling middleware
app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handleInternalErrors);

module.exports = app;
