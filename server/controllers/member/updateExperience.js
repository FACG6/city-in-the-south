const { updateExperience } = require('../../database/queries/members/updateExperience');
const { experienceSchema } = require('../../helpers/validation-schema');


module.exports = (req, res, next) => {
  const { memberId } = req.params;
  const {
    title, endDate, startDate, location, description, id,
  } = req.body;
  const expInfo = {
    title, endDate, startDate, location, description, id, memberId,
  };
  experienceSchema.validate(expInfo)
    .then(() => {
      updateExperience(expInfo, memberId)
        .then(({ rows }) => res.status(200).send({ error: null, data: rows }))
        .catch(err => next(err));
    })
    .catch(() => next({ code: 400, msg: 'Ensure you enter validly data' }));
};
