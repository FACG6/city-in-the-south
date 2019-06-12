const connection = require('../../config/db_connection');

exports.getFilterData = (memberId) => {
  const sql = {
    text: 'SELECT COALESCE(json_agg(skills) FILTER (WHERE skills IS NOT NULL),\'[]\') as skills, COALESCE(json_agg(offer_type) FILTER (WHERE offer_type IS NOT NULL),\'[]\') as offer_types FROM filter WHERE member_id = $1',
    values: [memberId],
  };
  return connection.query(sql);
};
