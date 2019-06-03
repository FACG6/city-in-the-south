const router = require('express').Router();

const authentication = require('./authentication');
const application = require('./applications');
const filter = require('./filter');
const member = require('./member');
const offer = require('./offer');
const offerType = require('./offer-type');
const skills = require('./skills');

router.use('/authentication', authentication);
router.use('/application', application);
router.use('./filter', filter);
router.use('/members', member);
router.use('/offers', offer);
router.use('/offer_type', offerType);
router.use('/skills', skills);


module.exports = router;
