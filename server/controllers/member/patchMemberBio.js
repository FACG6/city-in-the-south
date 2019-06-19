const yup = require('yup');

const { patchBio } = require('../../database/queries/members/patchMemberBio');

const patchBioSchema = yup.object().shape({
  bio: yup.string().required(),
  memberId: yup.number().required(),
});

module.exports = (req, res, next) => {
  const { memberId } = req.params;
  const { bio } = req.body;
  patchBioSchema.validate({ bio, memberId })
    .then(() => {
      patchBio(bio, memberId)
        .then(({ rows }) => {
          if (!rows[0]) return next({ code: 400, msg: 'Bad Request ..' });
          return res.status(200).send({ error: null, data: rows[0].bio });
        })
        .catch(err => next(err));
    })
    .catch(() => next({ code: 400, msg: 'Ensure you enter validly data' }));
};
