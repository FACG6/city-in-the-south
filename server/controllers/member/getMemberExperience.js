const { getMemberEXp } = require('../../database/queries/members/getMemberExperience');

module.exports = (req, res, next) => {
  const { memberId } = req.params;

  getMemberEXp(memberId)
    .then((response) => {
      res.send({
        error: null,
        data: response.rows[0],
      });
    })
    .catch(err => next(err));
};
