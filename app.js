const express = require('express');
const {
  handlePSQLErrors,
  handleCustomErrors,
  handleInternalErrors,
} = require('./controllers/errors-controllers.js');
const app = express();
const apiRouter = require('./routes/api-router.js');

app.use(express.json());
app.use('/api', apiRouter);

// error-handling middleware
app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handleInternalErrors);

module.exports = app;
