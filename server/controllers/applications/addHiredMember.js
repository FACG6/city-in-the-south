const yup = require('yup');
const { addHiredMember } = require('../../database/queries/applications/index');

module.exports = (req, res, next) => {
  const { member_id: memberId, offer_id: offerId } = req.body;
  const validationSchema = yup.object().shape({
    offerId: yup.string().required(),
    memberId: yup.string().required(),
  });
  validationSchema
    .validate({ offerId, memberId })
    .then(() => {
      addHiredMember(memberId, offerId)
        .then((result) => {
          res.send({
            error: null,
            data: result.rows,
          });
        })
        .catch(err => next({ code: 500, msg: err.message }));
    })
    .catch(err => next({ code: 400, msg: err.message }));
};
