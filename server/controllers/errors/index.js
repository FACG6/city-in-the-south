const createError = require('http-errors');

exports.notFound = (req, res) => {
  res.status(404).send(createError(404, 'Page Not Found ...!'));
};

exports.serverError = (err, req, res, next) => {
  switch (err.code) {
    case 400:
      res.status(400).send(err);
      break;
    case 401:
      res.status(401).send(createError(401, 'authentication error'));
      break;
    case 403:
      res.status(403).send(createError(403, 'forbidden'));
      break;
    default:
      res.status(500).send(createError(500, 'Internal Server Error'));
      break;
  }
};
