const getMembers = require('./getMembers');
const addMember = require('./addMember');
const addEducation = require('./addEducations');
const addExperience = require('./addExperience');
const deleteEducation = require('./deleteEducation');
const deleteExperience = require('./deleteExperience');
const getMember = require('./getMember');
const getEducations = require('./getMemberEducation');
const getExperiences = require('./getMemberExperience');

module.exports = {
  getMembers,
  addMember,
  addEducation,
  addExperience,
  deleteEducation,
  deleteExperience,
  getMember,
  getEducations,
  getExperiences,
};
