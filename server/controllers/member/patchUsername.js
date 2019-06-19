const yup = require('yup');

const { patchUsername } = require('../../database/queries/members/patchUsername');

const patchUserNameSchema = yup.object().shape({
  username: yup.string().required(),
  memberId: yup.number().required(),
});

module.exports = (req, res, next) => {
  const { memberId } = req.params;
  const { username } = req.body;
  patchUserNameSchema.validate({ username, memberId })
    .then(() => {
      patchUsername(username, memberId)
        .then(({ rows }) => {
          if (!rows[0]) return next({ code: 400, msg: 'Bad Request ..' });
          return res.status(200).send({ error: null, data: rows[0].username });
        })
        .catch(err => next(err));
    })
    .catch(() => next({ code: 400, msg: 'Ensure you enter validly data' }));
};
