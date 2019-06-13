const dbconnection = require('../../config/db_connection');

exports.patchFilter = (skills, offerType, memberId) => {
  const newSkills = skills.map(skill => (JSON.stringify(skill).toString()));
  const newOfferTypes = offerType.map(offertype => (JSON.stringify(offertype).toString()));
  const sql = {
    text: 'UPDATE filter SET skills = $1, offer_type = $2 WHERE member_id = $3 RETURNING *',
    values: [newSkills, newOfferTypes, memberId],
  };
  return dbconnection.query(sql);
};
