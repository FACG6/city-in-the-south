const { addOfferType } = require('../../database/queries/offer-type/postOfferType.js');
const yup = require('yup');

module.exports = (req, res, next) => {
  const name = req.body;
  const schema = yup.object({
    name: yup.string().required(),
  });
  schema.validate({ name })
    .then(() => {
      addOfferType(name)
        .then((result) => {
          res.send({
            error: null,
            data: result.rows[0],
          });
        }).catch(() => next({ code: 500, msg: 'internal server error' }));
    }).catch(() => next({ code: 400, msg: 'page not found' }));// validation error
};
