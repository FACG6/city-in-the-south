const { checkSkills, insertSkills } = require('../../database/queries/skills/index');
const { postSkillSchema } = require('../../helpers/validation-schema');

module.exports = (req, res, next) => {
  const skillInfo = { ...req.body };
  postSkillSchema
    .validate(skillInfo)
    .then(() => checkSkills(skillInfo.name))
    .then((result) => {
      if (!result.rowCount) {
        return insertSkills(skillInfo.name)
          .then(response => res.send({
            error: null,
            data: response.rows[0],
          }));
      } return next({ code: 400, msg: 'skill already exist' });
    })
    .catch(err => next(err));
};
