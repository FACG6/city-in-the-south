const yup = require('yup');

const { patcFullName } = require('../../database/queries/members/patchFullName');

const patchFullNameSchema = yup.object().shape({
  fullname: yup.string().required(),
  memberId: yup.number().required(),
});

module.exports = (req, res, next) => {
  const { memberId } = req.params;
  const { fullname } = req.body;
  patchFullNameSchema.validate({ fullname, memberId })
    .then(() => {
      patcFullName(fullname, memberId)
        .then(({ rows }) => {
          if (!rows[0]) return next({ code: 400, msg: 'Bad Request ..' });
          return res.status(200).send({ error: null, data: rows[0].full_name });
        })
        .catch(err => next(err));
    })
    .catch(() => next({ code: 400, msg: 'Ensure you enter validly data' }));
};
