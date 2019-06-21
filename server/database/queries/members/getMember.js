
const dbconnection = require('../../config/db_connection');

exports.getMember = username => dbconnection.query(`SELECT member.id, member.address, member.avatar, member.bio, member.email, member.full_name, member.phone, member.profession_id, member.username ,COALESCE(json_agg(skill) FILTER (WHERE skill.id IS NOT NULL),'[]') AS skills
FROM member LEFT OUTER JOIN member_skill ON member_skill.member_id = member.id 
LEFT OUTER JOIN skill ON skill.id = member_skill.skill_id 
GROUP BY member.id HAVING  member.username = $1 `, [username]);
