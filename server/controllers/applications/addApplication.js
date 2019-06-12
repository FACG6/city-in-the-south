const yup = require('yup');
const { addApplication } = require('../../database/queries/applications/index');

module.exports = (req, res, next) => {
  const { member_id: memberId, offer_id: offerId, proposal } = req.body;

  const schema = yup.object({
    offerId: yup.string().required(),
    memberId: yup.string().required(),
    proposal: yup.string().required(),
  });
  schema
    .validate({ offerId, memberId, proposal })
    .then(() => {
      addApplication(memberId, offerId, proposal)
        .then((result) => {
          res.send({
            error: null,
            data: result.rows,
          });
        })
        .catch(err => next({ code: 500, msg: err.message }));
    })
    .catch((err) => {
      next({ code: 400, msg: err.message });
    });
};
