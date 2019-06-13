const { getFilterData } = require('../../database/queries/filter/index');

const parseData = arr => arr.map(item => JSON.parse(item));

module.exports = (req, res, next) => {
  getFilterData(req.params.member_id)
    .then((response) => {
      const data = response.rows[0];
      data.skills = parseData(data.skills);
      data.offer_type = parseData(data.offer_type);
      res.send({
        error: null,
        data,
      });
    })
    .catch(err => next(err));
};
