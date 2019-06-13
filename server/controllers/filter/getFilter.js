const { getFilterData } = require('../../database/queries/filter/index');

module.exports = (req, res, next) => {
  getFilterData(req.params.member_id)
    .then((response) => {
      res.send({
        error: null,
        data: response.rows,
      });
    })
    .catch(err => next(err));
};
