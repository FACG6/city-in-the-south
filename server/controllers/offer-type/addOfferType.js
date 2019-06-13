const yup = require('yup');

const { checkofferTypeName, addOfferType } = require('../../database/queries/offer-type');

module.exports = (req, res, next) => {
  const { name } = req.body;

  const schema = yup.object({
    name: yup.string().required(),
  });
  schema.validate({ name })
    .then(() => {
      checkofferTypeName(name)
        .then((resultCheck) => {
          if (!resultCheck.rowCount) {
            addOfferType(name)
              .then((resultAdd) => {
                res.send({
                  error: null,
                  data: resultAdd.rows,
                });
              });
          } else next({ code: 400, msg: 'offer_type already exist' });
        })
        .catch(() => next({ code: 500, msg: 'internal server error' }));
    })
    .catch(() => next({ code: 400, msg: 'sure enter valid data' }));
};
