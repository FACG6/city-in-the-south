const { getMember } = require('../../database/queries/members/getMember');

module.exports = (req, res, next) => {
  const { memberId } = req.params;
  getMember(memberId)
    .then((response) => {
      res.send({
        error: null,
        data: response.rows,
      });
    })
    .catch(err => next(err));
};
