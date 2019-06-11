const express = require('express');
const supertest = require('supertest');
const { expect } = require('chai');
const build = require('./../server/database/config/db_build');

const app = express();

describe('make test for back-end post route', () => {
  it('sample test', (done) => {
    expect(1).equal(1);
    done();
  });

  it('test for /offer post route', (done) => {
    build()
      .then(() => {
        supertest(app)
          .post('/api/v1/offer')
          .send({
            data: {
              title: 'Ui application for website',
              position: 'front end developer',
              description: 'I need web developer',
              skills: [
                { id: 1, name: 'javascript' },
                { id: 10, name: 'Node.js' },
                { id: 5, name: 'Express' },
              ],
              offer_type: [
                { id: 1, name: 'Full Time' },
                { id: 10, name: 'Fixed price' },
              ],
              member_id: 2,
            },
          })
          .expect(200)
          .expect('content-type', 'application/json; charset=utf-8')
          .end((error, response) => {
            if (error) return done(error);
            expect(response.body.data.description).to.have.string('I need web developer');
            done();
          });
      })
      .catch((error) => {
        done(error);
      });
  });
});
