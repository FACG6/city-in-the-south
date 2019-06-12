const { getFilterData } = require('../../database/queries/filter/index');

module.exports = (req, res) => {
  console.log(req.params.member_id);
  getFilterData(req.params.member_id)
    .then(response => res.send(response.rows))
    .catch(err => console.log(err))
};
