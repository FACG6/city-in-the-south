const { getMembers } = require('../../database/queries/members/getMembers');

module.exports = (req, res, next) => {
  const { offset } = req.params;
  getMembers(offset)
    .then((response) => {
      res.send({
        error: null,
        data: response.rows,
      });
    })
    .catch(err => next(err));
};
