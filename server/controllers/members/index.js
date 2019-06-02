const router = require('express').Router();
const { get } = require('./get');
const { post } = require('./post');

router.get('/:offset', get);
router.post('', post);
module.exports = router;
