const yup = require('yup');

const { getMyApplications } = require('../../database/queries/applications/index');

module.exports = (req, res, next) => {
  const { memberId } = req.params;

  const schema = yup.object({
    memberId: yup.string().required(),
  });

  schema
    .validate({
      memberId,
    })
    .then(() => {
      getMyApplications(memberId)
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
