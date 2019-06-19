const { updateEduction } = require('../../database/queries/members/updateEducation');
const { educationSchema } = require('../../helpers/validation-schema');


module.exports = (req, res, next) => {
  const { memberId } = req.params;
  const {
    id, title, date, university, description,
  } = req.body;
  const educationInfo = {
    id, title, date, university, description, memberId,
  };
  educationSchema.validate(educationInfo)
    .then(() => {
      updateEduction(educationInfo, memberId)
        .then(({ rows }) => res.status(200).send({ error: null, data: rows }))
        .catch(err => next(err));
    })
    .catch(() => next({ code: 400, msg: 'Ensure you enter validly data' }));
};
