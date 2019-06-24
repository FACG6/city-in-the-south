const { deleteOffer, checkOffer } = require('../../database/queries/offers/index');

module.exports = (req, res, next) => {
  const { offerId } = req.params;
  checkOffer(offerId)
    .then((response) => {
      if (!response.rowCount) {
        next({ code: 400, msg: "You try to delete dosen't exist offer" });
      } else if (req.user.id === response.rows[0].member_id) {
        deleteOffer(offerId, req.user.id)
          .then(() => {
            res.send({
              error: null,
              data: 'success',
            });
          })
          .catch(err => next(err));
      } else {
        next({ code: 403, msg: 'The loggedin user is not authorized' });
      }
    })

    .catch(err => next(err));
};
