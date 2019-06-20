const { postFilter } = require('../../database/queries/filter/postFilter');

module.exports = (req, res, next) => {
  const { memberId } = req.body;
  postFilter(memberId)
    .then(({ rows }) => {
      res.status(200).send({ error: null, data: rows });
    })
    .catch(err => next(err));
};
