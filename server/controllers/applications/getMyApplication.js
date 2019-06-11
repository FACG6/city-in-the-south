const yup = require('yup');

const { getMyApplication } = require('../../database/queries/applications/index');

module.exports = (req, res, next) => {
  const { memberId, offerId } = req.params;

  const schema = yup.object({
    offerId: yup.string().required(),
    memberId: yup.string().required(),
  });

  schema
    .validate({
      offerId,
      memberId,
    })
    .then(() => {
      getMyApplication(memberId, offerId)
        .then((result) => {
          res.send({
            error: null,
            data: result.rows,
          });
        })
        .catch(() => next({ code: 500, msg: 'Internal Server Error' }));
    })
    .catch((err) => {
      next({ code: 400, msg: err.message });
    });
};
