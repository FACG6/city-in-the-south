const router = require('express').Router();
const { get } = require('./get');
const { put } = require('./put');

router.get('/:memberId', get);
router.post('/:memberId', put);

module.exports = router;
