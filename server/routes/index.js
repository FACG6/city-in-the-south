const router = require('express').Router();

const {
  authentication,
  application,
  filter,
  member,
  offer,
  offerType,
  skills,
} = require('../controllers');

router.get('/login', authentication.login);
router.get('/logout', authentication.logout);

/* Application */
router.get('/offer-application/:offerId', application.getOfferApplication);

router.get('/my-application/:memberId', application.getMyApplication);

router.post('/application', application.addApplication);

router.post('/hired_member', application.addHireMember);
router.patch('/hired_member/:memberId', application.updateHireMember);

/* filter */
router.route('/filter/:member_id')
  .get(filter.getFilter)
  .patch(filter.updateFilter);

/* Member */
router.get('/members/:offset', member.getMembers);
router.post('/members', member.addMember);

/* Offer */
router.get('/offer/:offerId', offer.getOfferDetails);
router.get('/offers/:offset', offer.getOffers);
router.post('/offers', offer.addOffer);
router.delete('/offers/:offerId', offer.deleteOffer);

router.get('/my-offers/:memberIid', offer.getMyOffers);

router.post('/saved-offer', offer.addSavedOffer);
router.get('/saved-offers/:memberId', offer.getSavedOffers);
router.delete('/saved-offer/:offerId', offer.deleteSavedOffer);

/* Offer Type */
router.get('/offer-type', offerType.getOfferTypes);
router.post('/offer-type', offerType.addOfferType);


/* Skills */
router.get('/skiils', skills.getSkills);
router.post('/skills/:memberId', skills.getMemberSkills);
router.post('/skills', skills.addSkills);

module.exports = router;
