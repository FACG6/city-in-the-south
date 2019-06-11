const connection = require('../../config/db_connection');

exports.getSkills = () => connection.query('SELECT * FROM skill');
