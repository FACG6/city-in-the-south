const yup = require('yup');
const { patchFilter } = require('../../database/queries/filter/patchFilter');

const parseData = arr => arr.map(item => JSON.parse(item));

const filterSchema = yup.object().shape({
  skills: yup.array().of(yup.object().shape({ id: yup.number(), name: yup.string() })),
  offerType: yup.array().of(yup.object().shape({ id: yup.number(), name: yup.string() })),
  memberId: yup.string().required(),
});
module.exports = (req, res, next) => {
  const { member_id: memberId } = req.params;
  if (memberId === 'guest') return res.send({ error: null, data: req.body });
  const { skills, offer_type: offerType } = req.body;
  filterSchema
    .validate({ skills, offerType, memberId })
    .then(() => {
      patchFilter(skills, offerType, memberId)
        .then((result) => {
          const { skills: _skills, offer_type: _offerType, member_id } = result.rows[0];
          const data = {
            member_id,
            skills: parseData(_skills),
            offer_type: parseData(_offerType),
          };

          res.send({ error: null, data });
        })
        .catch(err => next(err));
    })
    .catch(() => next({ code: 400, msg: 'Enter valid data' }));
};
