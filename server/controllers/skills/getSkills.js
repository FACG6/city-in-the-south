const { getSkills } = require('../../database/queries/skills/index');

module.exports = (req, res, next) => {
  getSkills()
    .then((response) => {
      res.send({
        error: null,
        data: response.rows,
      });
    })
    .catch(err => next(err));
};
