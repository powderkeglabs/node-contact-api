/**
 * Testing Request Functionality
 */
var chai = require('chai');
var supertest = require('supertest');
var api = supertest.agent('http://localhost:3000/api/v1');

describe('Passing Tests', function() {
  it('Should send a request', function(done) {
    api.post('/Contact/quorum')
      .send({
        name: 'JJ Hiew',
        email: 'jj@powderkeglabs.com',
        phone: '123-456-7890'
      }).expect(200, done);
  });
});

describe('Failing Tests', function() {
  it('Should fail with invalid email', function(done) {
    api.post('/Contact/quorum')
      .send({
        name: 'JJ Hiew',
        email: 'jjpowderkeglabs.com',
        phone: '123-456-7890'
      }).expect(400, done);
  });

  it('Should fail with missing name', function(done) {
    api.post('/Contact/quorum')
      .send({
        email: 'jj@powderkeglabs.com',
        phone: '123-456-7890'
      }).expect(400, done);
  });
});
