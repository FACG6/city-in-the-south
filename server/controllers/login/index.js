const router = require('express').Router();

const { post } = require('./login');

router.post('', post);

module.exports = router;
