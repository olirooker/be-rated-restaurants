const send404 = (req, res, next) => {
  res.status(404).send({ msg: 'Route not found!' });
};

const send405 = (req, res, next) => {
  res.status(405).send({ msg: 'Method not allowed!' });
};

const handlePSQLErrors = (err, req, res, next) => {
  const badReqCodes = ['22P02', '23502', '23514'];
  const notFoundCodes = ['23503'];
  if (badReqCodes.includes(err.code)) {
    res.status(400).send({ msg: 'Bad request' });
  } else if (notFoundCodes.includes(err.code)) {
    res.status(404).send({ msg: 'Not found' });
  } else {
    next(err);
  }
};

const handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

const handleInternalErrors = (err, req, res, next) => {
  console.log('unhandled err:', err);
  res.status(500).send({ msg: 'Internal server error' });
};

module.exports = {
  send404,
  send405,
  handlePSQLErrors,
  handleCustomErrors,
  handleInternalErrors,
};
