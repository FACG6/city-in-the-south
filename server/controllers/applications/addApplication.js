const yup = require('yup');
const { addApplication } = require('../../database/queries/applications/index');
const {
  getOfferTitleAndMemberUsername,
  addNewNotification,
} = require('../../database/queries/notifications/index');

function addNotification(offerId, memberId, io, next) {
  // fetch database for memberId if the offer owner)
  // fetch databse for full name of applicant member using memberId
  getOfferTitleAndMemberUsername(memberId, offerId)
    .then((result) => {
      if (result.rows) {
        const url = `/app/offers/${offerId}`;
        const { title, owner_id, username } = result.rows[0];
        const msg = `${username} is applied to your offer titled:${title}`;
        const notification = {
          title,
          msg,
          url,
          seen: false,
          tag: null,
          member_id: owner_id,
        };
        return notification;
      }
      next({ code: 500, msg: 'Internal server error' });
    })
    .then(notification => addNewNotification(notification))
    .then((result) => {
      if (result.rows) {
        const offerMemberId = result.rows[0].member_id;
        const memberSocket = io.of(`/member-${offerMemberId}`);
        memberSocket.emit('myOfferNotification', result.rows[0]);
      }
    })

    .catch(() => next({ code: 500, msg: 'Internal Server Error' }));
}

module.exports = (req, res, next) => {
  const { member_id: memberId, offer_id: offerId, proposal } = req.body;
  const validationSchema = yup.object().shape({
    offerId: yup.string().required(),
    memberId: yup.number().required(),
    proposal: yup.string().required(),
  });
  validationSchema
    .validate({ offerId, memberId, proposal }, { abortEarly: false })
    .then(() => {
      addApplication(memberId, offerId, proposal)
        .then((result) => {
          addNotification(offerId, memberId, req.io, next);
          res.send({
            error: null,
            data: result.rows,
          });
        })
        .catch(err => next(err));
    })
    .catch(err => next({ code: 400, msg: err.message }));
};
