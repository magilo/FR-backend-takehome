const request = require('supertest');
const app = require('../src/app');


it('returns 200 OK when add transaction request is valid', async() => {
  expect(response.status).toBe(200);
})

it('returns success message when add transaction request is valid', async() => {
  expect(response.body.message).toBe('transaction added');
})


