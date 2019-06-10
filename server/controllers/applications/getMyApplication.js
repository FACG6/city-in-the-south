const yup = require('yup');

const getMyApplications = require('../../database/queries/applications/getMyApplications');
const getMyApplication = require('../../database/queries/applications/getMyApplication');

module.exports = (req, res, next) => {
  const { offerId } = req.query;
  const { memberId } = req.params;

  const schema = yup.object({
    offerId: yup.string().nullable(),
    memberId: yup.string().required(),
  });

  schema
    .validate({
      offerId,
      memberId,
    })
    .then(() => {
      if (offerId) {
        getMyApplication(memberId, offerId)
          .then((result) => {
            res.send({
              error: null,
              data: result.rows[0],
            });
          })
          .catch(() => next({ code: 500, msg: 'Internal Server Error' }));
      } else {
        getMyApplications(memberId)
          .then((result) => {
            res.send({
              error: null,
              data: result.rows,
            });
          })
          .catch(() => next({ code: 500, msg: 'Internal Server Error' }));
      }
    })
    .catch((err) => {
      next({ code: 400, msg: err.message });
    });
};
