const createError = require('http-errors');

exports.notFound = (req, res) => {
  res.status(404).send(createError(404, 'Page Not Found ...!'));
};

exports.serverError = (err, req, res, next) => {
  switch (err.code) {
    case 401:
      res.status(400).send(createError(400, err.msg));
      break;
    case 403:
      res.status(403).send(createError(403, 'unauthorization '));
      break;
    default:
      res.status(500).send(createError(500, 'Internal Server Error'));
      break;
  }
};
