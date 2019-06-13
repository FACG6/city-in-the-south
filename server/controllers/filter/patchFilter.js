
const yup = require('yup');
const { patchFilter } = require('../../database/queries/filter/patchFilter');

const filterSchema = yup.object().shape({
  skills: yup.array()
    .of(yup.object().shape({ id: yup.number(), name: yup.string() })).required(),
  offerType: yup.array()
    .of(yup.object().shape({ id: yup.number(), name: yup.string() })).required(),
  memberId: yup.number().required(),
});
module.exports = (req, res, next) => {
  const { member_id: memberId } = req.params;
  const { skills, offer_type: offerType } = req.body;
  filterSchema.validate({ skills, offerType, memberId })
    .then(() => {
      patchFilter(skills, offerType, memberId)
        .then(result => res.send({ error: null, data: result.rows }))
        .catch(err => next(err));
    })
    .catch(() => next({ code: 400, msg: 'Enter valid data' }));
};
