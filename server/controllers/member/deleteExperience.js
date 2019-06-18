const yup = require('yup');

const { deleteExperience } = require('../../database/queries/members/deleteExperience');

const deleteExpSchema = yup.object().shape({
  memberId: yup.number().required(),
  experienceId: yup.number().required(),
});

module.exports = (req, res, next) => {
  const { memberId } = req.params;
  const { experienceId } = req.body;
  deleteExpSchema
    .validate({ memberId, experienceId })
    .then(() => {
      deleteExperience(memberId, experienceId)
        .then(() => {
          res.status(200).send({ error: null, data: 'Deleted successfully ' });
        })
        .catch(err => next(err));
    })
    .catch(() => next({ code: 400, msg: 'Ensure to enter validly data' }));
};
