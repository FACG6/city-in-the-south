const { SavedOfferSchema } = require('../../helpers/validation-schema');

const { deleteSavedOffer } = require('../../database/queries/offers/deleteSavedOffer');

module.exports = (req, res, next) => {
  const { memberId } = req.params;
  const { offerId } = req.body;
  SavedOfferSchema
    .validate({ memberId, offerId })
    .then(() => {
      deleteSavedOffer({ memberId, offerId })
        .then(({ rows: deletedSaved }) => {
          if (!deletedSaved[0]) return next({ code: 400, msg: 'No record to delete ' });
          return res.status(200).send({ error: null, data: 'success' });
        })
        .catch(err => next(err));
    })
    .catch(() => next({ code: 400, msg: 'Ensure to enter validly data' }));
};
