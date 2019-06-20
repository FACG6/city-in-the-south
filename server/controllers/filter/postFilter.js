const { postFilter } = require('../../database/queries/filter/postFilter');

module.exports = (req, res, next) => {
  postFilter(req.body)
    .then(({ rows }) => {
      res.status(200).send({ error: null, data: rows });
    })
    .catch(err => next(err));
};
