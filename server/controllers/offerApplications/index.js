const router = require('express').Router();
const { get } = require('./get');

router.get('/:offerId', get);

module.exports = router;
