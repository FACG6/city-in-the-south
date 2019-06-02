const router = require('express').Router();
const { patch } = require('./patch');
const { post } = require('./post');

router.patch('/:memberId', patch);
router.post('', post);
module.exports = router;
