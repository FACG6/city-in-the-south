const yup = require('yup');

const { deleteEducation } = require('../../database/queries/members/deleteEducation');

const deleteEducationSchema = yup.object().shape({
  memberId: yup.number().required(),
  educationId: yup.number().required(),
});

module.exports = (req, res, next) => {
  const { memberId } = req.params;
  const { educationId } = req.body;
  deleteEducationSchema
    .validate({ memberId, educationId })
    .then(() => {
      deleteEducation(memberId, educationId)
        .then(() => {
          res.status(200).send({ error: null, data: 'Deleted successfully ' });
        })
        .catch(err => next(err));
    })
    .catch(() => next({ code: 400, msg: 'Ensure to enter validly data' }));
};
