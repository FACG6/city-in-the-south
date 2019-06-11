const { checkSkills, insertSkills } = require('../../database/queries/skills/index');

module.exports = (req, res, next) => {
  const { name } = req.body;
  checkSkills(name)
    .then((result) => {
      if (result.rows.length === 0) {
        return insertSkills(name);
      } return next({ code: 400, msg: 'skill already exist' });
    })
    .then(response => res.send({
      error: null,
      data: response.rows[0],
    }))
    .catch(err => next(err));
};
