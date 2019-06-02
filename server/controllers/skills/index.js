const router = require('express').Router();
const { getAll } = require('./getAll');
const { post } = require('./post');
const { get } = require('./get');

router.get('', getAll);
router.get('/:memberId', get);
router.post('', post);

module.exports = router;
