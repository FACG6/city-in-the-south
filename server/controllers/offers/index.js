const router = require('express').Router();
const { get } = require('./get');
const { post } = require('./post');
const { deleteOffer } = require('./delete');

router.get('/:offset', get);
router.post('', post);
router.delete('/:offerId', deleteOffer);

module.exports = router;
