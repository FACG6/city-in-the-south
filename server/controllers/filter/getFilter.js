const { getFilterData } = require('../../database/queries/filter/index');

const parseData = arr => arr.map(item => JSON.parse(item));

module.exports = (req, res, next) => {
  getFilterData(req.params.member_id)
    .then((response) => {
      let data = response.rows[0];
      if (!data) {
        data = {};
      }
      if (data && data.skills) {
        data.skills = parseData(data.skills);
      }
      if (data && data.offer_type) {
        data.offer_type = parseData(data.offer_type);
      }
      res.send({
        error: null,
        data,
      });
    })
    .catch(err => next(err));
};
