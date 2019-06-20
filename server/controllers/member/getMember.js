const { getMember } = require('../../database/queries/members/getMember');

module.exports = (req, res, next) => {
  const { username } = req.params;
  getMember(username)
    .then((response) => {
      res.send({
        error: null,
        data: response.rows,
      });
    })
    .catch(err => next(err));
};
