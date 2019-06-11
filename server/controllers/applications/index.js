const addHireMember = require('./addHiredMember');
const updateHireMember = require('./patchHiredMember');
const addApplication = require('./addApplication');
const getOfferApplication = require('./getOfferApplication');
const getMyApplication = require('./getMyApplication');

module.exports = {
  addHireMember, updateHireMember, addApplication, getOfferApplication, getMyApplication,
};
