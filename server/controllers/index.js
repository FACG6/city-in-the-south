const router = require('express').Router();

const login = require('./login');
const logout = require('./logout');
const members = require('./members');
const offers = require('./offers');
const savedOffers = require('./savedOffers');
const applications = require('./applications');
const offerApplications = require('./offerApplications');
const myApplications = require('./myApplications');

router.use('/login', login);
router.get('/logout', logout);
router.use('/members', members);
router.use('/offers', offers);
router.use('/saved-offers', savedOffers);
router.use('/applications', applications);
router.use('/offer-applications', offerApplications);
router.use('/my-applications', myApplications);

module.exports = router;
