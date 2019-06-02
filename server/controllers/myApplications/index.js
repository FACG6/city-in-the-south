const router = require('express').Router();
const { get } = require('./get');

router.get('/:memberId/:offerId', get);

module.exports = router;
