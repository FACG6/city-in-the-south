exports.notFound = (req, res) => {
  res.status(404).send({ error: { code: '404', msg: 'Page Not Found ...!' }, data: null });
};

exports.serverError = (err, req, res, next) => {
  switch (err.code) {
    case 400:
      res.status(400).send({ error: { code: 400, msg: err }, data: null });
      break;
    case 401:
      res.status(401).send({ error: { code: 401, msg: 'authentication error' }, data: null });

      break;
    case 403:
      res.status(403).send({ error: { code: 403, msg: 'forbidden' }, data: null });

      break;
    default:
      res.status(500).send({ error: { code: 500, msg: 'Internal Server Error' }, data: null });
      break;
  }
};
