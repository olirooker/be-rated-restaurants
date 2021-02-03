const handlePSQLErrors = (err, req, res, next) => {
  const badReqCodes = ['22P02'];
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

module.exports = { handlePSQLErrors, handleCustomErrors, handleInternalErrors };
