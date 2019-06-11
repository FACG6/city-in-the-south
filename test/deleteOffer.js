const tape = require('tape');
const supertest = require('supertest');

const connection = require('../server/database/config/db_connection');
const router = require('../server/app');

const insertOffer = () => connection.query('INSERT INTO offer(title, position, member_id) VALUES (\'small shop\', \'accountant\', 2)');

const selectOffer = () => connection/query('SELECT * FROM offer LIMIT 1');

// const deleteOffer = (id) => connection.query('')