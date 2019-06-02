const router = require('express').Router();
const { post } = require('./post');

router.post('', post);

module.exports = router;
