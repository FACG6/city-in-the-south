const { addExperience } = require('../../database/queries/members/addExpericne');
const { experienceSchema } = require('../../helpers/validation-schema');

module.exports = (req, res, next) => {
  const {
    title, endDate, startDate, location, description, memberId,
  } = req.body;
  const experienceInfo = {
    title, endDate, startDate, location, description, memberId,
  };
  experienceSchema
    .validate(experienceInfo)
    .then(() => {
      addExperience(experienceInfo)
        .then(({ rows }) => {
          res.status(200).send({ error: null, data: rows });
        })
        .catch(err => next(err));
    })
    .catch(() => next({ code: 400, msg: 'Ensure to enter validly data' }));
};
