const router = require('express').Router();

const {
  authentication,
  application,
  filter,
  member,
  offer,
  offerType,
  skills,
  erros,
} = require('../controllers');

router.post('/login', authentication.login);
router.post('/members', member.addMember);

router.post('/members', member.addMember);
router.use(authentication.authentication);

router.get('/isAuthenticated', authentication.isAuthenticated);

router.get('/logout', authentication.logout);

/* Application */
router.get('/offer-applications/:offerId', application.getOfferApplication);

router.get('/:memberId/my-applications', application.getMyApplications);
router.get('/:memberId/my-applications/:offerId', application.getMyApplication);

router.post('/applications', application.addApplication);

router.post('/hired-member', application.addHireMember);
router.patch('/hired-member/:memberId', application.updateHireMember);

/* filter */
router
  .route('/filter/:member_id')
  .get(filter.getFilter)
  .patch(filter.updateFilter);

/* Member */
router.get('/members/:offset', member.getMembers);

/* Offer */
router.get('/offers/:offset', offer.getOffers);

router.get('/offer/:offerId', offer.getOfferDetails);
router.patch('/offer/:offerId', offer.updateOfferStatus);
router.post('/offers', offer.addOffer);
router.delete('/offers/:offerId', offer.deleteOffer);

router.get('/my-offers/:memberId', offer.getMyOffers);

router.post('/saved-offers', offer.addSavedOffer);
router.get('/saved-offers/:memberId', offer.getSavedOffers);
router.delete('/saved-offers/:memberId', offer.deleteSavedOffer);

/* Offer Type */
router.get('/offer-type', offerType.getOfferTypes);
router.post('/offer-type', offerType.addOfferType);

/* Skills */
router.get('/skills', skills.getSkills);
router.get('/skills/:memberId', skills.getMemberSkills);
router.post('/skills', skills.addSkills);

/** Profile */

router.get('/member/:username', member.getMember);
router.patch('/member/fullname/:memberId', member.patchFullName);
router.patch('/member/bio/:memberId', member.patchBio);
router.patch('/member/username/:memberId', member.patchUserName);

router.put('/member/member-skills/:memberId', member.updateMemberSkills);

router.get('/education/:memberId', member.getEducations);
router.post('/education', member.addEducation);
router.delete('/education/:memberId', member.deleteEducation);
router.put('/education/:memberId', member.updateEducation);

router.get('/experience/:memberId', member.getExperiences);
router.post('/experience', member.addExperience);
router.delete('/experience/:memberId', member.deleteExperience);
router.put('/experience/:memberId', member.updateExperience);

router.use(erros.notFound);
router.use(erros.serverError);
module.exports = router;
