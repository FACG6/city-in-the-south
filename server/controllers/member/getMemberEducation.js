const { getMemberEduction } = require('../../database/queries/members/getMemberEducation');

module.exports = (req, res, next) => {
  const { memberId } = req.params;
  getMemberEduction(memberId)
    .then((response) => {
      res.send({
        error: null,
        data: response.rows,
      });
    })
    .catch(err => next(err));
};
