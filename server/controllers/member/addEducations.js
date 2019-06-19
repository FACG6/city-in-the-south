const { addEducation } = require('../../database/queries/members/addEducation');
const { educationSchema } = require('../../helpers/validation-schema');

module.exports = (req, res, next) => {
  const {
    title, date, university, description, memberId,
  } = req.body;
  const educationInfo = {
    title, date, university, description, memberId,
  };
  educationSchema.validate(educationInfo)
    .then(() => {
      addEducation(educationInfo)
        .then(({ rows }) => {
          res.status(200).send({ error: null, data: rows });
        })
        .catch(err => next(err));
    })
    .catch(() => next({ code: 400, msg: 'Ensure you enter validly data' }));
};
