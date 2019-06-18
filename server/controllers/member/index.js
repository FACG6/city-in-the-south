const getMembers = require('./getMembers');
const addMember = require('./addMember');
const addEducation = require('./addEducations');
const addExperience = require('./addExperience');
const deleteEducation = require('./deleteEducation');
const deleteExperience = require('./deleteExperience');
const getMember = require('./getMember');
const getEducations = require('./getMemberEducation');
const getExperiences = require('./getMemberExperience');
const patchFullName = require('./patchFullName');
const patchBio = require('./patchMemberBio');
const patchUserName = require('./patchUsername');
const updateEducation = require('./updateEducation');
const updateExperience = require('./updateExperience');
const updateMemberSkills = require('./updateMemberSkills');
const updateAvatar = require('./updateAvatar');

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
  patchFullName,
  patchBio,
  patchUserName,
  updateEducation,
  updateExperience,
  updateMemberSkills,
  updateAvatar,
};
